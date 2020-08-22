import express from 'express';
import connection from './database/connection';
import generateUniqueId from './utils/generateUniqueId';
import encryptPWD from './utils/encryptPWD';
import convertHourToMinutes from './utils/convertHourToMinutes';

//import * as UserController from './controllers/UserController';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

/**
 * GET user
 */
//routes.get('/user', UserController.index);

routes.post('/classes', async (request, response) => {
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

    let id: string;

    id = generateUniqueId(); // generates unique ID

    const pwd = encryptPWD(request.body.pwd); // encrypts the password

    const trx = await connection.transaction();

    //const insertedUsersIds = await connection('user').insert({
    await connection('user').insert({
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
    await connection('classes').insert({
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

    await connection('class_schedule').insert(classSchedule);

    return response.send();
});

export default routes;
