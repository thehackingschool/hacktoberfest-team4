import nodemailer from "nodemailer";

let mailBody = `<h1>Hey Ifra,your appointment is confirmed!</h1>`

async function sendEmail(){
    try {
        let transporter = nodemailer.createTransport({
            host:"mail.csmafia.com",
            port: 465,
            secure: true,
            auth:{
                user:"cfi@csmafia.com",
                pass:"codeforindiaFTW"
            },
            tls:{
                rejectUnauthorized:false
            }
        })

        let info = await transporter.sendMail({
            from: `CFI TASKY <cfi@csmafia.com>`,
            subject:"This is a test",
            to:'amtulifra12@gmail.com',
            html: mailBody
        })

        console.log(info.messageId)


    } catch (error) {
        console.error(error);
    }
}


export default sendEmail;