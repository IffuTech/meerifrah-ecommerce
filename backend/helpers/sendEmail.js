const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        type: "SMTP",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          user: 'ifrah.farooq@girnarcare.com',
          pass: 'secret',
            },
        });

        await transporter.sendMail({
            from: 'ifrah.farooq@girnarsoft.com',
            to: 'mirifrah110@gmail.com',
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;