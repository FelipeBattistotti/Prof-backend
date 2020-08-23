import { Request, Response } from 'express';

import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';
import encryptPWD from '../utils/encryptPWD';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
};

class ClassesController {

    async index (request: Request, response: Response) {
        
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
