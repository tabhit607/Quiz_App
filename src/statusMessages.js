/**
 * @description Defines status messages for different scenarios.
 */

module.exports = {
  QUIZ_NOT_FOUND: { message: "Quiz not found", status: 404 },
  RESULT_NOT_FOUND: { message: "Results not found", status: 404 },
  QUESTION_NOT_FOUND: { message: "Question not found", status: 404 },
  DUPLICATE_ANSWER_NOT_ALLOWED: {
    message: "Duplicate answer submission not allowed",
    status: 400,
  },
  INTERNAL_SERVER_ERROR: { message: "Internal Server Error", status: 500 },
  INVALID_QUIZ_TITLE: { message: "Invalid quiz title", status: 400 },
  INVALID_QUIZ_QUESTIONS: { message: "Invalid quiz questions", status: 400 },
  INVALID_QUESTION_TEXT: { message: "Invalid question text", status: 400 },
  INVALID_QUESTION_OPTIONS: { message: "Invalid question options", status: 400 },
  
};
