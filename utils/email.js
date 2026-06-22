const { Resend } = require('resend');


console.log(process.env.RESEND_API_KEY);
const resend = new Resend(
    process.env.RESEND_API_KEY
);

const sendEmail = async ({
    email,
    subject,
    message
}) => {

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject,
        text: message
    });
};

module.exports = sendEmail;