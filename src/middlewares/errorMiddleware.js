/** 
 * Error handler middleware
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Response} - The response object
 * 
 *  
*/

const statusMessages = require('../statusMessages');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || statusMessages.INTERNAL_SERVER_ERROR.status;
    const message = err.message || statusMessages.INTERNAL_SERVER_ERROR.message;

    res.status(status).json({ message });

};

module.exports = errorHandler;

