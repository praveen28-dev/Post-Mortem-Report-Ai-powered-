# User Stories

## Personas

### Persona 1: Alex - The Busy Student
- **Background**: University student juggling coursework, part-time job, and extracurriculars
- **Goals**: Stay on top of assignment deadlines, prioritize tasks effectively
- **Pain Points**: Forgets deadlines, loses track of what's urgent
- **Tech Comfort**: Moderate - uses smartphone and laptop daily

### Persona 2: Sam - The Organized Planner
- **Background**: Graduate student who likes structured workflows
- **Goals**: Categorize tasks by priority, track progress visually
- **Pain Points**: Existing tools are too complex or not student-focused
- **Tech Comfort**: High - comfortable with web apps

---

## User Stories

### Authentication Stories

**US-01**: As a new student, I want to register with my name, email, and password so that I can create a personal account.
- **Acceptance Criteria**:
  - Registration form with name, email, password fields
  - Email uniqueness validation
  - Password minimum 6 characters
  - Redirect to dashboard on success

**US-02**: As a returning student, I want to log in with my email and password so that I can access my tasks.
- **Acceptance Criteria**:
  - Login form with email and password
  - Error message on invalid credentials
  - JWT token stored on success
  - Redirect to dashboard on success

**US-03**: As a logged-in student, I want to log out so that my account is secure on shared devices.
- **Acceptance Criteria**:
  - Logout button visible in navigation
  - Token cleared on logout
  - Redirect to login page

### Task Management Stories

**US-04**: As a student, I want to create a task with a title, description, deadline, and priority so that I can track my work.
- **Acceptance Criteria**:
  - Form with title (required), description (optional), deadline (required), priority selector
  - Task saved to database linked to my account
  - Task appears in my task list immediately

**US-05**: As a student, I want to view all my tasks so that I can see everything I need to do.
- **Acceptance Criteria**:
  - Task list shows all my tasks
  - Each task shows title, deadline, priority, and status
  - Tasks sorted by deadline by default

**US-06**: As a student, I want to update a task so that I can change its details or mark it complete.
- **Acceptance Criteria**:
  - Edit button on each task
  - All fields editable
  - Status can be changed to Pending / In Progress / Completed
  - Changes saved immediately

**US-07**: As a student, I want to delete a task so that I can remove tasks I no longer need.
- **Acceptance Criteria**:
  - Delete button on each task
  - Confirmation before deletion
  - Task removed from list immediately

### Dashboard Stories

**US-08**: As a student, I want to see a dashboard with task statistics so that I can understand my workload at a glance.
- **Acceptance Criteria**:
  - Shows total, completed, pending, and overdue task counts
  - Visual cards for each statistic
  - Updates in real-time as tasks change

**US-09**: As a student, I want overdue tasks highlighted so that I know what needs immediate attention.
- **Acceptance Criteria**:
  - Overdue tasks visually distinct (red border or badge)
  - Overdue count shown on dashboard
  - Overdue defined as: deadline passed and status not Completed
