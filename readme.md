# Smart Task Management System

A full-stack task management web application that allows users to register, log in securely, and manage their tasks efficiently. The application includes user authentication, task tracking, and CRUD operations with protected routes.

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT-based Authentication
* Protected Routes

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* User-specific Task Access

### Security

* Password Encryption with bcrypt
* JWT Token Verification
* Authorization Middleware
* Protected API Endpoints

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcryptjs

### Development Tools

* Nodemon
* Postman
* Git & GitHub

## Project Structure

server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .gitignore
├── package.json
└── server.js

## API Endpoints

### Authentication

#### Register User

POST /api/auth/register

#### Login User

POST /api/auth/login

### Tasks

#### Create Task

POST /api/tasks

#### Get All Tasks

GET /api/tasks

#### Update Task

PUT /api/tasks/:id

#### Delete Task

DELETE /api/tasks/:id

## Installation

### Clone Repository

git clone <repository-url>

### Navigate to Project

cd Smart-Task-Management-System/server

### Install Dependencies

npm install

### Create Environment Variables

Create a .env file inside the server folder and add:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

### Run Project

npm run dev

## Future Improvements

* React Frontend
* Task Categories
* Task Filtering
* Search Functionality
* Due Date Reminders
* Dashboard Analytics

## Author

Nibashis Gorain
