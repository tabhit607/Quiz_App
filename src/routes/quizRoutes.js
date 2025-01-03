/**
 * The quizRoutes module exports a router object that defines routes for quiz-related endpoints.
 * The router object is used to define the following routes:
 * POST /quizzes: Create a new quiz
 * GET /quizzes/:id: Get a quiz by ID
 * POST /quizzes/:id/answers: Submit answers for a quiz
 */

const express = require('express');
const router = express.Router();
const validateQuiz = require('../middlewares/validateQuiz');
const quizController = require('../controllers/quizController');

// Apply the validateQuiz middleware to the route that creates a new quiz
router.post('/quizzes', validateQuiz, quizController.createQuiz);
router.get('/quizzes/:id', quizController.getQuiz);
router.post('/quizzes/:id/answers', quizController.submitAnswer);

module.exports = router;
