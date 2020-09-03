import nodemailer from 'nodemailer';
require('dotenv').config();

async function sendEmail(param: string) {

    if (process.env.MAIL_HOST === undefined || process.env.MAIL_HOST === '') {
        return;
    }

    const host: string = String(process.env.MAIL_HOST);
    const port: number = Number(process.env.MAIL_PORT);
    const user: string = String(process.env.MAIL_USER);
    const pass: string = String(process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false,
        auth: {
            user: user,
            pass: pass
        },
        tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: 'Prof - Web App',
        text: param,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }
    });
};

export default sendEmail;
