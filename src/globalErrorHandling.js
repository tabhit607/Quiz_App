/**
 * Global Error Handling Middleware
 */

const fs = require('fs');
const path = require('path');

// Function to log errors to a file
const logErrorToFile = (message) => {
    const logFilePath = path.join(__dirname, 'error.log');
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
};

// Global Error Handling for Uncaught Exceptions
process.on('uncaughtException', (err) => {
    const message = `Uncaught Exception: ${err.message}\nStack: ${err.stack}`;
    console.error(message);
    logErrorToFile(message);

    // Perform a graceful shutdown
    process.exit(1); // Optional: Exit the process after handling the exception
});

// Global Error Handling for Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    const message = `Unhandled Rejection at: ${promise}\nReason: ${reason}`;
    console.error(message);
    logErrorToFile(message);

    // Perform a graceful shutdown
    process.exit(1); // Optional: Exit the process after handling the rejection
});
