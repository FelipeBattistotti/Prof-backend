import { Request, Response } from 'express';

import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';
import encryptPWD from '../utils/encryptPWD';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import sendEmail from './../utils/sendEmail';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
};

class ClassesController {

    async index (request: Request, response: Response) {
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'É necessário informar os filtros para a busca das Aulas'
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await connection('classes')
                              .whereExists(function () {
                                  this.select('class_schedule.*')
                                    .from('class_schedule')
                                    .whereRaw('class_schedule.class_id = classes.id')
                                    .whereRaw('class_schedule.week_day = ?', [Number(week_day)])
                                    .andWhere('class_schedule.from', '<=', timeInMinutes)
                                    .andWhere('class_schedule.to', '>', timeInMinutes)
                              })
                              .where('classes.subject', '=', subject)
                              .join('user', 'classes.user_id', '=', 'user.id')
                              .select(['user.id',
                                       'user.name',
                                       'user.email',
                                       'user.pwd',
                                       'user.avatar',
                                       'user.whatsapp',
                                       'user.bio',
                                       'classes.subject',
                                       'classes.cost'
                                     ]);

        sendEmail('Busca - Professores disponíveis.');

        return response.json(classes);
    };

    async create (request: Request, response: Response) {
        let id: string;
    
        const {
            name,
            email,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await connection.transaction();
    
        try {
            id = generateUniqueId(); // generates unique ID
    
            const pwd = encryptPWD(request.body.pwd); // encrypts the password
    
            //const insertedUsersIds = await connection('user').insert({
            await trx('user').insert({
                id,
                name,
                email,
                pwd,
                avatar,
                whatsapp,
                bio,
            });
    
            //const user_id = insertedUsersIds[0];
            const user_id = id;
            id = generateUniqueId(); // generates unique ID
    
            //const insertedClassesIds = await connection('classes').insert({
            await trx('classes').insert({
                id,
                subject,
                cost,
                user_id,
            });
    
            const class_id = id;
    
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                id = generateUniqueId(); // generates unique ID
                return {
                    id,
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
    
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();

            sendEmail('Inclusão - Formulário para dar Aulas');

            return response.status(201).send();
        } catch (error) {
            await trx.rollback();
            return response.status(400).json({
                error: 'Erro ao tentar criar uma classe.'
            });
        }
    };
};

export default ClassesController;
