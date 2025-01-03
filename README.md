# Quiz Application

## Description
This project is a simple Quiz Application built with Node.js and Express. It allows users to create quizzes, submit answers, and retrieve results. The application uses in-memory storage for quizzes and results, and is designed with security best practices.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Security Practices](#security-practices)
- [Known Issues and Limitations](#known-issues-and-limitations)

## Setup instructions to run app locally

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/tabhit607/Quiz_App.git
   cd Quiz_App

2. Install dependencies:
   ```sh
   npm install
3. Set up environment variables: Create a `.env` file in the root directory of the project and add the following environment variables:
   ```sh
   SESSION_SECRET=your_secret_key
   PORT=3000
   ALLOW_DUPLICATE_ANSWERS=false
5. Run the application:
   ```sh
   npm run dev
6. The application will be available at http://localhost:3000.   

## Docker Setup

## Prerequisites
   -   Docker
   -   Docker Compose

1. Build the Docker image:
   ```sh
   docker-compose build
3. Run the Docker container:
   ```sh
   docker-compose up
5. The application will be available at http://localhost:3000.

## API Endpoints

## Create Quiz
-   Method: POST
-   URL: `/api/quizzes`
-   Request body:
-  ```sh
   {
        "title": "Sample Quiz",
    "questions": [
        {
            "id": "1",
            "text": "Sample Question 1?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_option": 0
        },
        {
            "id": "2",
            "text": "Sample Question 2?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_option": 2
        }
    ]
   }
-   Response:
-   ```sh
    {
    "quiz": {
        "id": "QUIZ_ID",
        "title": "Sample Quiz",
        "questions": [
            {
                "id": "1",
                "text": "Sample Question 1?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_option": 0
            },
            {
                "id": "2",
                "text": "Sample Question 2?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_option": 2
            }
        ]
      }


## Get Quiz
-   Method: GET
-   URL: `/api/quizzes/:id`
-   Response:
-   ```sh
    {
    "id": "QUIZ_ID",
    "title": "Sample Quiz",
    "questions": [
        {
            "id": "1",
            "text": "Sample Question 1?",
            "options": ["Option A", "Option B", "Option C", "Option D"]
        },
        {
            "id": "2",
            "text": "Sample Question 2?",
            "options": ["Option A", "Option B", "Option C", "Option D"]
        }
    ]
    }

## Submit Answer
-   Method: POST
-   URL: `/api/quizzes/:id/answers`
-   Body:
-   ```sh
    {
    "question_id": "1",
    "selected_option": 0
    }
-   Response:
-   ```sh
    {
    "is_correct": true,
    "correct_option": 0
    }

## Get Results
-   Method: GET
-   URL: `/api/quizzes/:id/results`
-   Response:
-   ```sh
    {
    "quiz_id": "QUIZ_ID",
    "user_id": "USER_ID",
    "score": 1,
    "answers": [
        {
            "question_id": "1",
            "selected_option": 0,
            "is_correct": true
        }
    ]
    }

## Running Tests

## Prerequisites
-   Jest
-   Supertest

## Running Tests

1. Install Jest and Supertest:
    ```sh
   npm install --save-dev jest supertest
3. Run the tests:
    ```sh
   npm test


## Security Practices

- Input validation and sanitization using `validator`
- Rate limiting to prevent abuse using `express-rate-limit`
- Secure HTTP headers using `helmet`
- CORS configuration using `cors`
- Secure cookies for session management
- Environment variables for sensitive information using `dotenv`
- Logging HTTP requests using `morgan`

## Known Issues and Limitations

- This is an in-memory application and data will be lost when the server restarts.
