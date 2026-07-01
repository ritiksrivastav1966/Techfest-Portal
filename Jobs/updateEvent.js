const cron = require('node-cron');
const Events = require('../Models/eventData');

cron.schedule('0 0 * * *', async () => {
    

    await Events.updateMany(
        {
            date: { $lt: new Date() },
            status: 'upcoming'
        },
        {
            status: 'completed'
        }
    );

    console.log('Updated completed events');
});