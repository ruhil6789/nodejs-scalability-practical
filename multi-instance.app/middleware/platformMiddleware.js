module.exports = {
    errorHandler: (err, req, res, next) => {
        // Handle errors
    },
    logger: (req, res, next) => {
        // Log requests
        next();
    },
    authentication: (req, res, next) => {
        // Authenticate requests
        next();
    }
};