/**
 * In the getResults controller, we retrieve the user ID from the session
 * and use it to find the user's results for a specific quiz. If the results
 * are found, we return them in the response. Otherwise, we return a 404
 * status code with a message indicating that the results are not found.
 */

const { results } = require('../data');
const { submitAnswer } = require('../utils/answerUtils');
const statusMessages = require('../statusMessages'); 

// Controller function to get results for a quiz
exports.getResults = (req, res, next) => {
    try {
        const userId = req.session.userId;
        const result = results.find(r => r.quiz_id === req.params.id && r.user_id === userId);

        if (result) {
            res.json(result);
        } else {
            const error = new Error(statusMessages.RESULT_NOT_FOUND.message);
            error.status = statusMessages.RESULT_NOT_FOUND.status;
            throw error;
        }
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
