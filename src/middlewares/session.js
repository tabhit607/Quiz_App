/**
 * In the session middleware, we generate a unique user ID using the uuidv4 function from the uuid package
 * and assign it to req.session.userId if it doesn't already exist.
 * This ensures that each user has a unique identifier associated with their session.
 */

const { v4: uuidv4 } = require('uuid');

// Middleware to manage session and assign user ID
const sessionMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = uuidv4();
    }
    next();
};

module.exports = sessionMiddleware;
