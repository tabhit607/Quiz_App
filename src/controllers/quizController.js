/**
 * In the createQuiz controller, we create a new quiz with a unique ID
 * and add it to the quizzes array. We return the newly created quiz
 * along with the user ID from the session in the response.
 */

const { v4: uuidv4 } = require('uuid');
const { quizzes } = require('../data');
const { submitAnswer } = require('../utils/answerUtils');
const statusMessages = require('../statusMessages');

// Controller function to create a new quiz
exports.createQuiz = (req, res, next) => {
    try {
        const { title, questions } = req.body;

        if (!title || title.trim() === '') {
            throw new Error(statusMessages.INVALID_QUIZ_TITLE.message);
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error(statusMessages.INVALID_QUIZ_QUESTIONS.message);
        }

        const newQuiz = {
            id: uuidv4(),
            title,
            questions: questions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.options,
                correct_option: q.correct_option
            }))
        };

        quizzes.push(newQuiz);

        res.status(201).json({
            quiz: newQuiz
        });
    } catch (error) {
        next(error);
    }
};

// Controller function to get a quiz by ID
exports.getQuiz = (req, res, next) => {
    try {
        const quiz = quizzes.find(q => q.id === req.params.id);
        if (!quiz) {
            throw new Error(statusMessages.QUIZ_NOT_FOUND.message);
        }
        res.json(quiz);
    } catch (error) {
        next(error);
    }
};

// Controller function to submit an answer for a quiz question
exports.submitAnswer = (req, res, next) => {
    try {
        submitAnswer(req, res);
    } catch (error) {
        next(error);
    }
};
