const cron = require('node-cron');

// Simulated event logs
let eventLogs = [];

// Function to check if the daily job's dependencies are satisfied
function areDependenciesSatisfied() {
    // Check if the event logs cover an entire day (24 hours)
    const currentTime = new Date();
    const startOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const logsWithinDay = eventLogs.filter(log => log.timestamp >= startOfDay && log.timestamp < endOfDay);

    // Check if there are event logs for each hour of the day
    for (let hour = 0; hour < 24; hour++) {
        const logsInHour = logsWithinDay.filter(log => log.timestamp.getHours() === hour);
        if (logsInHour.length === 0) {
            return false;
        }
    }

    return true;
}

// Daily job function
function dailyJob() {
    if (areDependenciesSatisfied()) {
        console.log('Daily job executed. Dependencies are satisfied.');
        // Perform the daily job tasks here
    } else {
        console.log('Daily job skipped. Dependencies are not satisfied.');
    }
}

// Schedule the daily job to run every day at midnight
cron.schedule('*/2 * * * * *', dailyJob);

// Simulated event logging every hour
cron.schedule('*/2 * * * * *', () => {
    const currentTime = new Date();
    eventLogs.push({ timestamp: currentTime });
    console.log('Event logged at:', currentTime);
});