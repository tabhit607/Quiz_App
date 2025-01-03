const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const sessionMiddleware = require("./middlewares/session");
const errorHandler = require('./middlewares/errorMiddleware'); 
require('./globalErrorHandling');

dotenv.config();

const app = express();

// Middleware for securing HTTP headers
app.use(helmet());

// Middleware for logging HTTP requests
app.use(morgan("combined"));

// Middleware for handling CORS
const corsOptions = {
  origin: "http://your-frontend-domain.com", // Replaced by client domain when it will be in use
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware for rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Configure and use session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents JavaScript access to cookies
    },
  })
);
app.use(sessionMiddleware);

// Use routes for quizzes and results
app.use("/api", quizRoutes);
app.use("/api", resultRoutes);

// Use the error-handling middleware app.
app.use(errorHandler);

module.exports = app;
