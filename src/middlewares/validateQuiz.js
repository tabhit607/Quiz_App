/**
 * In the validateQuiz middleware, we check if the request body contains a title and an array of questions.
 * If any of these conditions are not met, we return a 400 status code with a message indicating that 
 * the quiz data is invalid.
 * Otherwise, we call the next function to proceed with the request handling.
 */

const validator = require('validator');

// Middleware function to validate and sanitize quiz data
const validateQuiz = (req, res, next) => {
    const { title, questions } = req.body;

    // Validate and sanitize title
    if (!title || typeof title !== 'string' || !validator.isLength(title, { min: 1 })) {
        return res.status(400).json({ message: 'Invalid quiz title' });
    }
    req.body.title = validator.escape(title);

    // Validate questions
    if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid quiz questions' });
    }

    // Validate and sanitize each question
    for (let question of questions) {
        // Validate question text
        if (!question.text || typeof question.text !== 'string' || !validator.isLength(question.text, { min: 1 })) {
            return res.status(400).json({ message: 'Invalid question text' });
        }
        question.text = validator.escape(question.text);

        // Validate question options
        if (!Array.isArray(question.options) || question.options.length !== 4) {
            return res.status(400).json({ message: 'Each question must have 4 options' });
        }

        for (let option of question.options) {
            if (typeof option !== 'string' || !validator.isLength(option, { min: 1 })) {
                return res.status(400).json({ message: 'Invalid option text' });
            }
            option = validator.escape(option);
        }

        // Validate correct_option
        if (typeof question.correct_option !== 'number' || !Number.isInteger(question.correct_option) || question.correct_option < 0 || question.correct_option > 3) {
            return res.status(400).json({ message: 'Invalid correct option index' });
        }
    }

    next();
};

module.exports = validateQuiz;
