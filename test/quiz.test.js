require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');

// Test suite for Quiz API
describe('Quiz API', () => {
    let quizId;
    let questionId;
    const agent = request.agent(app); // Use request.agent to maintain the same session

    // Test case to create a new quiz
    it('should create a new quiz', async () => {
        const res = await agent
            .post('/api/quizzes')
            .send({
                title: 'Sample Quiz',
                questions: [
                    {
                        text: 'Sample Question 1?',
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        correct_option: 0
                    },
                    {
                        text: 'Sample Question 2?',
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        correct_option: 2
                    }
                ]
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('quiz');
        quizId = res.body.quiz.id;
        questionId = res.body.quiz.questions[0].id;
    });

    // Test case to get a quiz by ID
    it('should get a quiz by ID', async () => {
        const res = await agent.get(`/api/quizzes/${quizId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', quizId);
        expect(res.body).toHaveProperty('title', 'Sample Quiz');
        expect(res.body.questions).toHaveLength(2);
    });

    // Test case to prevent duplicate answer submission
    it('should prevent duplicate answer submission', async () => {
        const answerRes1 = await agent
            .post(`/api/quizzes/${quizId}/answers`)
            .send({
                question_id: questionId,
                selected_option: 0
            });
        expect(answerRes1.statusCode).toEqual(200);

        const answerRes2 = await agent
            .post(`/api/quizzes/${quizId}/answers`)
            .send({
                question_id: questionId,
                selected_option: 0
            });
        expect(answerRes2.statusCode).toEqual(400);
        expect(answerRes2.body).toHaveProperty('message', 'Duplicate answer submission not allowed');
    });

    // Test case to get results for a quiz
    it('should get results for a quiz', async () => {
        const res = await agent.get(`/api/quizzes/${quizId}/results`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('quiz_id', quizId);
        expect(res.body).toHaveProperty('user_id');
        expect(res.body).toHaveProperty('score');
        expect(res.body.answers).toHaveLength(1); // Adjust the expected length based on answers
    });

    // Test case to submit an answer for a quiz question
    it('should submit an answer for a quiz question', async () => {
        const quizRes = await agent
            .post('/api/quizzes')
            .send({
                title: 'Sample Quiz',
                questions: [
                    {
                        text: 'Sample Question 1?',
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        correct_option: 0
                    }
                ]
            });
        const quizId = quizRes.body.quiz.id;

        const res = await agent
            .post(`/api/quizzes/${quizId}/answers`)
            .send({
                question_id: quizRes.body.quiz.questions[0].id,
                selected_option: 0
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('is_correct', true);
    });

    // Test case for invalid quiz title
    it('should return 400 for invalid quiz title', async () => {
        const res = await agent
            .post('/api/quizzes')
            .send({
                title: '',
                questions: [
                    {
                        text: 'Sample Question 1?',
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        correct_option: 0
                    }
                ]
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid quiz title');
    });

    // Test case for invalid quiz questions
    it('should return 400 for invalid quiz questions', async () => {
        const res = await agent
            .post('/api/quizzes')
            .send({
                title: 'Sample Quiz',
                questions: []
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid quiz questions');
    });
});
