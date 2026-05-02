# Build Instructions

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

## Backend Build

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MONGO_URI, JWT_SECRET, FRONTEND_URL
npm run dev        # Development (nodemon)
npm start          # Production
```

## Frontend Build

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with VITE_API_URL
npm run dev        # Development server (Vite HMR)
npm run build      # Production build -> dist/
npm run preview    # Preview production build
```

## Verify Both Running
- Backend: http://localhost:5000/api/health → `{"status":"OK"}`
- Frontend: http://localhost:5173
