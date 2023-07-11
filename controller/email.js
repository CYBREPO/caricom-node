
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer'


const email = async (data) => {
    try{
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASS,
            },
        });

        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'AutoHyre',
                link: process.env.AUTOHYRELINK
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            }
        });
        
    
        var emailBody = mailGenerator.generate(data.email);
        var mailOptions = {
            from: process.env.EMAIL, // sender address
            to: data.mails, // list of receivers
            subject: "Autohyre", // Subject line
            html: emailBody, // html body
        };
    
        return await transporter.sendMail(mailOptions);
    }
    catch(ex){
        console.log(ex)
        return ex;
    }
    
}

export default email