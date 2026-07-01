const cron = require('node-cron');
const Events = require('./../Models/eventData');
const Registrations = require('./../Models/registrationData');
const sendEmails = require('./../utils/email');

cron.schedule('0 9 * * *', async () => {

    console.log('Checking reminders....');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(tomorrow);
    end.setHours(23, 59, 59, 999);
   // console.log(end);
    const events = await Events.find({
        date: {
            $gte: start,
            $lte: end
        },
        reminderSent: false
    });
    // console.log(events);
    for (const event of events) {

        const registrations = await Registrations.find({
            event: event._id
        }).populate('user','name email');
        // console.log(registrations);
        const formattedDate = event.date.toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short'
});
        for (const registration of registrations) {

            const user = registration.user;
              // console.log(`sending emails to ${user.email}`);
            await sendEmails({
              email :  user.email,
              subject:  `Reminder: ${event.name} is tomorrow`,
              message:  `Hello ${user.name},

You have registered for:
${event.name}

Date:
${formattedDate}

Good luck!`
         } );
        }

        event.reminderSent = true;
        await event.save();
    }

});