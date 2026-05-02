# Application Design

## System Overview

TaskFlow is a two-tier web application:
- **Frontend**: React SPA served via Vite dev server (or static build)
- **Backend**: Express.js REST API
- **Database**: MongoDB (local or MongoDB Atlas)

---

## Component Architecture

### Backend Components

```
backend/
  src/
    config/         - DB connection, environment config
    models/         - Mongoose schemas (User, Task)
    middleware/     - Auth middleware (JWT verification)
    controllers/    - Business logic handlers
    routes/         - Express route definitions
    utils/          - Helper functions
  server.js         - Entry point
```

#### Backend Components Detail

**UserModel**
- Fields: name, email, password (hashed), createdAt
- Methods: Pre-save hook for password hashing

**TaskModel**
- Fields: title, description, deadline, priority, status, userId, createdAt, updatedAt
- Indexes: userId (for query performance), deadline (for overdue queries)

**AuthController**
- `register(req, res)` - Validate input, hash password, create user, return JWT
- `login(req, res)` - Validate credentials, compare hash, return JWT

**TaskController**
- `createTask(req, res)` - Create task linked to authenticated user
- `getTasks(req, res)` - Get all tasks for authenticated user
- `updateTask(req, res)` - Update task (ownership verified)
- `deleteTask(req, res)` - Delete task (ownership verified)

**AuthMiddleware**
- `protect(req, res, next)` - Verify JWT, attach user to req

**Routes**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks` (protected)
- `POST /api/tasks` (protected)
- `PUT /api/tasks/:id` (protected)
- `DELETE /api/tasks/:id` (protected)

---

### Frontend Components

```
frontend/
  src/
    api/            - Axios instance + API call functions
    components/     - Reusable UI components
    context/        - React Context (AuthContext)
    pages/          - Page-level components
    utils/          - Helper functions (date formatting, etc.)
  main.jsx          - Entry point
  App.jsx           - Router setup
```

#### Frontend Components Detail

**AuthContext**
- State: user, token, isAuthenticated
- Actions: login, logout, register

**Pages**
- `LoginPage` - Login form
- `RegisterPage` - Registration form
- `DashboardPage` - Stats cards + task list
- `TaskFormPage` - Create/Edit task form

**Components**
- `Navbar` - Navigation with logout
- `StatCard` - Dashboard statistic card
- `TaskCard` - Individual task display with edit/delete
- `TaskList` - List of TaskCards
- `TaskForm` - Create/Edit form
- `ProtectedRoute` - Route guard for authenticated pages
- `LoadingSpinner` - Loading state indicator

---

## Data Flow

```
User Action
    |
    v
React Component
    |
    v
API Layer (Axios)  -->  Express Route  -->  Middleware (JWT)
                                                |
                                                v
                                        Controller
                                                |
                                                v
                                        Mongoose Model  -->  MongoDB
                                                |
                                                v
                                        JSON Response
    |
    v
React State Update
    |
    v
UI Re-render
```

---

## API Contract

### Auth Endpoints

**POST /api/auth/register**
```json
Request:  { "name": "string", "email": "string", "password": "string" }
Response: { "token": "string", "user": { "id": "string", "name": "string", "email": "string" } }
```

**POST /api/auth/login**
```json
Request:  { "email": "string", "password": "string" }
Response: { "token": "string", "user": { "id": "string", "name": "string", "email": "string" } }
```

### Task Endpoints (all require Authorization: Bearer <token>)

**GET /api/tasks**
```json
Response: [{ "id": "string", "title": "string", "description": "string", "deadline": "date", "priority": "Low|Medium|High", "status": "Pending|In Progress|Completed", "createdAt": "date" }]
```

**POST /api/tasks**
```json
Request:  { "title": "string", "description": "string", "deadline": "date", "priority": "Low|Medium|High", "status": "Pending" }
Response: { task object }
```

**PUT /api/tasks/:id**
```json
Request:  { any task fields to update }
Response: { updated task object }
```

**DELETE /api/tasks/:id**
```json
Response: { "message": "Task deleted" }
```
