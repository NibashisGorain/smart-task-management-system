# Smart Task Management System

A full-stack task management web application built using **React, Node.js, Express.js, and MongoDB Atlas**.

The application allows users to securely register and log in, create and manage personal tasks, track deadlines, search and filter tasks, and monitor task completion through an interactive dashboard.

---

## Features

### Authentication & Security

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected Frontend Routes
- JWT Token Verification
- Authorization Middleware
- Protected API Endpoints
- User-specific Task Access
- Automatic handling of invalid or expired authentication tokens
- Password Show/Hide Toggle
- Logout functionality

---

### Task Management

- Create Tasks
- View Tasks
- Update/Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Mark Tasks as Pending
- Task Priority Management
- Task Description
- Due Date Management
- Due Today Detection
- Overdue Task Detection

---

### Search, Filter & Sort

- Search tasks by title and description
- Filter tasks by:
  - All
  - Pending
  - Completed
  - Overdue
- Sort tasks by:
  - Newest
  - Oldest
  - Due Date
  - Priority

---

### Dashboard & Analytics

- Total Task Count
- Pending Task Count
- Completed Task Count
- Overdue Task Count
- Task Completion Progress
- Task Bar Chart
- Priority Distribution Pie Chart
- Due Today Notification

---

### User Interface

- Responsive Dashboard Interface
- Dark Mode
- Toast Notifications
- Form Validation
- Character Counters for Task Title and Description
- Dynamic Add/Edit Task Form
- Delete Confirmation Modal
- User Welcome Message
- Clean and Interactive Dashboard

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Bootstrap
- Axios
- React Toastify
- Recharts

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- bcrypt

### Development Tools

- Visual Studio Code
- Postman
- Nodemon
- Git
- GitHub

### Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database
- GitHub - Source Code

---

## Project Structure

```text
Smart-Task-Management-System/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
API Endpoints
Authentication
Register User

POST /api/auth/register
Login User

POST /api/auth/login
Tasks
Create Task

POST /api/tasks
Get All Tasks

GET /api/tasks
Update Task

PUT /api/tasks/:id
Delete Task

DELETE /api/tasks/:id
Update Task Status

PUT /api/tasks/:id
All task APIs require a valid JWT token.


Authorization: Bearer <token>
Installation
Prerequisites
Make sure the following are installed:

Node.js

npm

Git

MongoDB Atlas account

1. Clone the Repository
Bash

git clone https://github.com/NibashisGorain/smart-task-management-system.git
2. Navigate to the Project
Bash

cd smart-task-management-system
3. Install Backend Dependencies
Navigate to the server folder:

Bash

cd server
Install dependencies:

Bash

npm install
4. Install Frontend Dependencies
Open another terminal and navigate to the client folder:

Bash

cd client
Install dependencies:

Bash

npm install
Environment Variables
Environment variables are required for the backend and frontend.

Backend
Create a .env file inside the server folder:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Frontend
Create a .env file inside the client folder:

env

VITE_API_URL=your_backend_api_url
Do not upload .env files or secret keys to GitHub.

Running the Application
The frontend and backend run separately.

Start Backend
Open a terminal:

Bash

cd server
npm run dev
The backend will start on the configured port.

Start Frontend
Open another terminal:

Bash

cd client
npm run dev
Vite will provide the local development URL in the terminal.

Open that URL in your browser.

Authentication Flow

User
  │
  ▼
Register / Login
  │
  ▼
Backend validates credentials
  │
  ▼
Password verified using bcrypt
  │
  ▼
JWT Token Generated
  │
  ▼
Token stored on client
  │
  ▼
Protected Dashboard
  │
  ▼
JWT sent with Task API requests
  │
  ▼
Backend verifies JWT
  │
  ▼
User-specific tasks accessed
Task Management Flow

Login
  │
  ▼
Dashboard
  │
  ├── Add Task
  ├── Edit Task
  ├── Delete Task
  ├── Complete Task
  ├── Mark Pending
  ├── Search
  ├── Filter
  └── Sort
  │
  ▼
MongoDB Atlas
Deployment
The application is deployed using:

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Source Code: GitHub

Future Improvements
Task Categories

Task Tags

Drag-and-Drop Task Management

Email Notifications

Recurring Tasks

User Profile Management

Password Reset

Advanced Analytics

Real-time Task Updates

Author
Nibashis Gorain