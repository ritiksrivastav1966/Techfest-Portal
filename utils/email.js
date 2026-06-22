const { Resend } = require('resend');



const resend = new Resend(
    process.env.RESEND_API_KEY
);

const sendEmail = async ({
    email,
    subject,
    message
}) => {

    await resend.emails.send({
        from: 'Techfest Portal <onboarding@resend.dev>',
        to: email,
        subject,
        text: message
    });
};

module.exports = sendEmail;