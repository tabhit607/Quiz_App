/**
 * In the createQuiz controller, we create a new quiz with a unique ID
 * and add it to the quizzes array. We return the newly created quiz
 * along with the user ID from the session in the response.
 */

const { v4: uuidv4 } = require('uuid');
const { quizzes } = require('../data');
const { submitAnswer } = require('../utils/answerUtils');

// Controller function to create a new quiz
exports.createQuiz = (req, res) => {
    const { title, questions } = req.body;

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
};

// Controller function to get a quiz by ID
exports.getQuiz = (req, res) => {
    const quiz = quizzes.find(q => q.id === req.params.id);
    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).json({ message: 'Quiz not found' });
    }
};

// Controller function to submit an answer for a quiz question
exports.submitAnswer = (req, res) => {
    submitAnswer(req, res);
};
