const winston = require('winston');
const { Elasticsearch } = require('winston-elasticsearch');

 const logger = winston.createLogger({
    transports: [
        new Elasticsearch({
            level: 'info',
            clientOpts: { node: 'http://your-elasticsearch-url:9200' }
        })
    ]
});

// Export the logger instance
module.exports = logger;
