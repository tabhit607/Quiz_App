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
                        id: "1",
                        text: 'Sample Question 1?',
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        correct_option: 0
                    }
                ]
            });
        const quizId = quizRes.body.quiz.id;

        // Submit an answer for the quiz
        const answerRes = await agent
            .post(`/api/quizzes/${quizId}/answers`)
            .send({
                question_id: "1",
                selected_option: 0
            });

        // Retrieve results for the quiz
        const res = await agent.get(`/api/quizzes/${quizId}/results`);
        expect(res.statusCode).toEqual(200); // Expect status code 200 for successful retrieval
        expect(res.body).toHaveProperty('quiz_id', quizId);
    });

    // Test case for non-existent results
    it('should return 404 for non-existent results', async () => {
        const agent = request.agent(app); // Use request.agent to maintain the same session
        const res = await agent.get('/api/quizzes/nonexistentid/results');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Results not found');
    });
});