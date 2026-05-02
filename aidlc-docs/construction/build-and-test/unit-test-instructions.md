# Unit Test Instructions

## Manual Testing Checklist

### Authentication Tests

1. **Register - Success**
   - POST /api/auth/register with valid name, email, password
   - Expected: 201, token + user object

2. **Register - Duplicate Email**
   - POST /api/auth/register with existing email
   - Expected: 400, "Email is already registered"

3. **Register - Missing Fields**
   - POST /api/auth/register with missing password
   - Expected: 400, validation error

4. **Login - Success**
   - POST /api/auth/login with valid credentials
   - Expected: 200, token + user object

5. **Login - Wrong Password**
   - POST /api/auth/login with wrong password
   - Expected: 401, "Invalid email or password"

### Task Tests

6. **Create Task - Success**
   - POST /api/tasks with valid data + Bearer token
   - Expected: 201, task object with userId set

7. **Create Task - No Auth**
   - POST /api/tasks without Authorization header
   - Expected: 401, "Not authorized"

8. **Get Tasks - Returns Only User's Tasks**
   - GET /api/tasks with Bearer token
   - Expected: 200, array of tasks (only for this user)

9. **Update Task - Success**
   - PUT /api/tasks/:id with valid data + Bearer token
   - Expected: 200, updated task

10. **Update Task - Wrong User**
    - PUT /api/tasks/:id with another user's token
    - Expected: 404, "Task not found"

11. **Delete Task - Success**
    - DELETE /api/tasks/:id with Bearer token
    - Expected: 200, "Task deleted successfully"

## Recommended Testing Tool
Use [Thunder Client](https://www.thunderclient.com/) (VS Code extension) or [Postman](https://www.postman.com/) to run these tests.
