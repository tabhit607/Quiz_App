require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');

// Test suite for Result API
describe('Result API', () => {
    // Test case to get results for a quiz
    it('should get results for a quiz', async () => {
        const agent = request.agent(app); // Use request.agent to maintain the same session

        // Create a new quiz
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
        expect(quizRes.statusCode).toEqual(201);
        const quizId = quizRes.body.quiz.id;
        const questionId = quizRes.body.quiz.questions[0].id;

        // Submit an answer for the quiz
        const answerRes = await agent
            .post(`/api/quizzes/${quizId}/answers`)
            .send({
                question_id: questionId,
                selected_option: 0
            });
        expect(answerRes.statusCode).toEqual(200);

        // Retrieve results for the quiz
        const res = await agent.get(`/api/quizzes/${quizId}/results`);
        expect(res.statusCode).toEqual(200); 
        expect(res.body).toHaveProperty('quiz_id', quizId);
        expect(res.body).toHaveProperty('user_id');
        expect(res.body).toHaveProperty('score');
        expect(res.body.answers).toHaveLength(1);
    });

    // Test case for non-existent results
    it('should return 404 for non-existent results', async () => {
        const agent = request.agent(app);
        const res = await agent.get('/api/quizzes/nonexistentid/results');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Results not found');
    });
});
