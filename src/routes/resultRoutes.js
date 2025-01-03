/**
 * The resultRoutes module exports a router object that defines a route for fetching a user's 
 * results for a specific quiz.
 * The route is defined as a GET request to /quizzes/:id/results, where :id is the quiz ID.
 * The route handler calls the getResults controller function from the resultController module 
 * to retrieve and return the user's results for the specified quiz.
 */

const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Routes for result-related endpoints
router.get('/quizzes/:id/results', resultController.getResults);

module.exports = router;
