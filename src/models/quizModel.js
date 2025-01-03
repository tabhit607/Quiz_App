const Quiz = {
    id: '',
    title: '',
    questions: [] // List of Question objects
};

const Question = {
    id: '',
    text: '',
    options: [], // List of strings
    correct_option: 0 // Index of the correct option (integer)
};

const Answer = {
    question_id: '',
    selected_option: 0, // Index of the selected option (integer)
    is_correct: false // Boolean indicating if the answer was correct
};

const Result = {
    quiz_id: '',
    user_id: '',
    score: 0, // Integer score
    answers: [] // List of Answer objects
};

module.exports = { Quiz, Question, Answer, Result };
