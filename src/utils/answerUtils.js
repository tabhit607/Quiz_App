/**
 * In the answerUtils.js file, we define a submitAnswer function that handles the submission of answers 
 * for quiz questions.
 * The submitAnswer function takes the question ID and selected option from the request body and updates
 * the user's results based on the submitted answer.
 * If the answer is correct, the user's score is incremented, and the answer is added to the user's results.
 * The function returns a response with the correctness of the answer and the correct option for the question.
 * If the quiz, question, or answer data is not found, the function returns an appropriate error response.
 * The allow_duplicate variable is used to determine whether duplicate answer submissions are allowed.
 */

const { quizzes, results } = require('../data');
const config = require('../../config'); // Adjusted path
const statusMessages = require('../statusMessages'); // Ensure correct path

const submitAnswer = (req, res) => {
    const { question_id, selected_option } = req.body;
    const allow_duplicate = config.allowDuplicateAnswers;
    const quiz = quizzes.find(q => q.id === req.params.id);

    if (quiz) {
        const question = quiz.questions.find(q => q.id === question_id);
        if (question) {
            let result = results.find(r => r.quiz_id === req.params.id && r.user_id === req.session.userId);
            if (!result) {
                result = {
                    quiz_id: req.params.id,
                    user_id: req.session.userId,
                    score: 0,
                    answers: []
                };
                results.push(result);
            }

            const existingAnswer = result.answers.find(a => a.question_id === question_id && a.selected_option === selected_option);

            if (existingAnswer && !allow_duplicate) {
                return res.status(statusMessages.DUPLICATE_ANSWER_NOT_ALLOWED.status).json(statusMessages.DUPLICATE_ANSWER_NOT_ALLOWED);
            }

            const is_correct = question.correct_option === selected_option;

            result.answers.push({
                question_id: question_id,
                selected_option: selected_option,
                is_correct: is_correct
            });
            if (is_correct) {
                result.score++;
            }

            return res.json({ is_correct, correct_option: question.correct_option });
        } else {
            return res.status(statusMessages.QUESTION_NOT_FOUND.status).json(statusMessages.QUESTION_NOT_FOUND);
        }
    } else {
        return res.status(statusMessages.QUIZ_NOT_FOUND.status).json(statusMessages.QUIZ_NOT_FOUND);
    }
};

module.exports = { submitAnswer };
