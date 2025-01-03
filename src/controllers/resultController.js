/**
 * In the getResults controller, we retrieve the user ID from the session
 * and use it to find the user's results for a specific quiz. If the results
 * are found, we return them in the response. Otherwise, we return a 404
 * status code with a message indicating that the results are not found.
 */

const { results } = require('../data');
const { submitAnswer } = require('../utils/answerUtils');

// Controller function to get results for a quiz
exports.getResults = (req, res) => {
    const userId = req.session.userId;
    const result = results.find(r => r.quiz_id === req.params.id && r.user_id === userId);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Results not found' });
    }
};

// Controller function to submit an answer for a quiz question
exports.submitAnswer = (req, res) => {
    submitAnswer(req, res);
};
