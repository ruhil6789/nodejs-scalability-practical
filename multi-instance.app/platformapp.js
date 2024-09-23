const express = require('express');
const app = express();
const platformMiddleware = require('./middleware/platformMiddleware');
const routes = require('./routes');


// Define error handling middleware
app.use(platformMiddleware.errorHandler);
app.use(platformMiddleware.logger);
app.use(platformMiddleware.authentication);

// Apply routes
app.use('/api', routes);

module.exports = app;

