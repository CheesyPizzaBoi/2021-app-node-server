const schedule = require('node-schedule');
        console.log('l')
        let someDate = new Date('2021-08-06 20:31:30');
        schedule.scheduleJob(someDate, () => {
            console.log('Job ran @', new Date().toString())
        });