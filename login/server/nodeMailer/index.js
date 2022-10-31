import nodemailer from "nodemailer";

async function sendEmail(data){
    try {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            secure: false,
            auth:{
                user:"emailtesting399@gmail.com",
                pass:"cvpwnjpwkqfscjje"
            },
            tls:{
                rejectUnauthorized:false
            }
        })

        let info = await transporter.sendMail({
            from: `LET OUT <emailtesting399@gmail.com>`,
            subject: data.subject,
            to: data.to,
            html: data.html
        })

        console.log(info.messageId)


    } catch (error) {
        console.error(error);
    }
}

export default sendEmail;