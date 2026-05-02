# NFR Requirements - Backend API Unit

## Security Requirements

### SEC-01: Password Security
- bcrypt with minimum 10 salt rounds
- Passwords never returned in API responses
- Password field excluded from all query results

### SEC-02: JWT Security
- Secret stored in environment variable (JWT_SECRET)
- Token expiry: 24 hours
- Token validated on every protected route

### SEC-03: Input Validation
- All request bodies validated before processing
- Mongoose schema validation as second layer
- Reject requests with unexpected/malicious payloads

### SEC-04: CORS
- CORS configured to allow only frontend origin
- Configurable via FRONTEND_URL environment variable

### SEC-05: Environment Variables
- MongoDB URI in MONGO_URI env var
- JWT secret in JWT_SECRET env var
- Port in PORT env var
- .env.example provided, .env in .gitignore

### SEC-06: Authorization
- All task endpoints verify task ownership (userId match)
- Users cannot access or modify other users' tasks

---

## Performance Requirements

### PERF-01: Database Indexes
- userId index on tasks collection
- deadline index on tasks collection
- email unique index on users collection

### PERF-02: Response Times
- Target: < 500ms for all CRUD operations
- MongoDB local/Atlas with proper indexing should achieve this

---

## Tech Stack Selection

| Component | Choice | Rationale |
|---|---|---|
| Runtime | Node.js 18+ | LTS, widely supported |
| Framework | Express.js 4.x | Minimal, beginner-friendly |
| ODM | Mongoose 7.x | Schema validation, hooks, clean API |
| Auth | jsonwebtoken 9.x | Industry standard JWT |
| Password | bcryptjs 2.x | Pure JS bcrypt (no native deps) |
| Validation | express-validator 7.x | Declarative input validation |
| CORS | cors 2.x | Simple CORS middleware |
| Env | dotenv 16.x | Standard .env loading |
| Dev | nodemon 3.x | Auto-restart in development |
