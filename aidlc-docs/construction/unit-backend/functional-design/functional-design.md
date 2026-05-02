# Functional Design - Backend API Unit

## Data Models

### User Model
```
Collection: users
Fields:
  - _id: ObjectId (auto)
  - name: String (required, trim)
  - email: String (required, unique, lowercase, trim)
  - password: String (required, min 6 chars, hashed)
  - createdAt: Date (auto)

Indexes:
  - email: unique index

Hooks:
  - pre('save'): hash password if modified
```

### Task Model
```
Collection: tasks
Fields:
  - _id: ObjectId (auto)
  - userId: ObjectId (ref: User, required, indexed)
  - title: String (required, trim, max 200 chars)
  - description: String (optional, max 1000 chars)
  - deadline: Date (required)
  - priority: Enum ['Low', 'Medium', 'High'] (default: 'Medium')
  - status: Enum ['Pending', 'In Progress', 'Completed'] (default: 'Pending')
  - createdAt: Date (auto)
  - updatedAt: Date (auto)

Indexes:
  - userId: index (for user-scoped queries)
  - deadline: index (for overdue queries)
```

---

## Business Logic

### Authentication Flow

**Register**:
1. Validate: name, email, password present
2. Check: email not already registered
3. Hash: password with bcrypt (10 rounds)
4. Create: User document
5. Generate: JWT (payload: userId, expires: 24h)
6. Return: token + user object (no password)

**Login**:
1. Validate: email, password present
2. Find: user by email
3. Compare: password with stored hash (bcrypt.compare)
4. If match: Generate JWT
5. Return: token + user object (no password)

### Task Business Rules

**Create Task**:
1. userId automatically set from JWT (req.user.id)
2. Validate required fields: title, deadline
3. Default status: 'Pending'
4. Default priority: 'Medium'

**Get Tasks**:
1. Query filter: { userId: req.user.id }
2. Sort: by deadline ascending (soonest first)
3. Return all fields except __v

**Update Task**:
1. Find task by id AND userId (ownership check)
2. If not found: 404 (prevents cross-user access)
3. Update only provided fields
4. updatedAt auto-updated by Mongoose timestamps

**Delete Task**:
1. Find task by id AND userId (ownership check)
2. If not found: 404
3. Delete document

### Overdue Detection Logic
- Overdue = deadline < Date.now() AND status !== 'Completed'
- Computed on frontend (no separate endpoint needed)
- Backend returns raw deadline dates for frontend to evaluate

---

## Error Handling

| Scenario | HTTP Status | Response |
|---|---|---|
| Missing required fields | 400 | { error: "Field X is required" } |
| Email already exists | 400 | { error: "Email already registered" } |
| Invalid credentials | 401 | { error: "Invalid email or password" } |
| Missing/invalid JWT | 401 | { error: "Not authorized" } |
| Task not found / wrong user | 404 | { error: "Task not found" } |
| Server error | 500 | { error: "Server error" } |
