# Smart Task Management System

A full-stack task management web application that allows users to register, log in securely, and manage their tasks efficiently. The application includes user authentication, task tracking, and CRUD operations with protected routes.

**Live Demo:** [smart-task-management-system-fawn.vercel.app](https://smart-task-management-system-fawn.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

### 🔐 Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected Routes

### ✅ Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- User-specific Task Access

### 🛡️ Security
- Password Encryption with bcrypt
- JWT Token Verification
- Authorization Middleware
- Protected API Endpoints

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JSON Web Token (JWT), bcryptjs |
| **Dev Tools** | Nodemon, Postman, Git & GitHub |

---

## Project Structure

\`\`\`
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
\`\`\`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login an existing user |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks` | Get all tasks |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## Installation

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/NibashisGorain/smart-task-management-system.git
\`\`\`

**2. Navigate to the project**
\`\`\`bash
cd Smart-Task-Management-System/server
\`\`\`

**3. Install dependencies**
\`\`\`bash
npm install
\`\`\`

**4. Create environment variables**

Create a `.env` file inside the `server` folder and add:
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
\`\`\`

**5. Run the project**
\`\`\`bash
npm run dev
\`\`\`

---

## Future Improvements

- [ ] Task Categories
- [ ] Task Filtering
- [ ] Search Functionality
- [ ] Due Date Reminders
- [x] Dashboard Analytics
- [x] React Frontend

---

## Author

**Nibashis Gorain**