const dotenv = require('dotenv');
const { quizzes, results } = require('../data');

dotenv.config();

const submitAnswer = (req, res) => {
    const { question_id, selected_option } = req.body;
    const quiz = quizzes.find(q => q.id === req.params.id);
    const allow_duplicate = process.env.ALLOW_DUPLICATE_ANSWERS === 'true';
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
                return res.status(400).json({ message: 'Duplicate answer submission not allowed' });
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

            res.json({ is_correct, correct_option: question.correct_option });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } else {
        res.status(404).json({ message: 'Quiz not found' });
    }
};

module.exports = { submitAnswer };
