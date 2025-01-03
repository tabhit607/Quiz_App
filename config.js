const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
    sessionSecret: process.env.SESSION_SECRET,
    port: process.env.PORT || 3000,
    allowDuplicateAnswers: process.env.ALLOW_DUPLICATE_ANSWERS === 'true'
};
