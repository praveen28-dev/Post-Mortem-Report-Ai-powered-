# PostMortem.dev - Terminal Edition

AI-powered incident postmortem generator with terminal aesthetic.

---

## Start

```bash
# Terminal 1
cd backend && npm install && npm start

# Terminal 2
npm install && npm run dev
```

Open: **http://localhost:5173**

---

## Features

- 🎨 Terminal-style dark UI
- 🔵 Blue accent (#63b3ed)
- 📊 Severity levels (SEV-1 to SEV-4)
- 🤖 Groq AI (llama3-8b-8192)
- 🔒 Secure backend (API key hidden)
- ⚡ Fast (~1-2 seconds)
- 💰 Free tier friendly

---

## Architecture

```
Frontend (React TS)  →  Backend (Express)  →  Groq API
localhost:5173          localhost:5000         llama3-8b-8192
```

---

## Configuration

### Backend (backend/.env)
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
PORT=5000
```

**⚠️ IMPORTANT:** Replace `YOUR_GROQ_API_KEY` with your actual key from https://console.groq.com/

### Frontend (.env) ✅
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## Documentation

- **START.md** - Quick start guide
- **SIMPLE_START.md** - Detailed quick start
- **FINAL_SUMMARY.md** - Complete summary
- **GROQ_BACKEND_SETUP.md** - Full setup guide

---

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite 8
- Custom CSS (no Tailwind)
- JetBrains Mono + Syne fonts

### Backend
- Express.js
- Groq SDK
- Zod validation
- CORS protection

---

## Scripts

### Backend
```bash
npm start      # Production mode
npm run dev    # Development mode (auto-reload)
```

### Frontend
```bash
npm run dev    # Development server
npm run build  # Production build
```

---

## Troubleshooting

### Backend won't start
```bash
cd backend
rm -rf node_modules
npm install
npm start
```

### Frontend won't start
```bash
rm -rf node_modules
npm install
npm run dev
```

---

## Production Deployment

### Backend (Heroku)
```bash
cd backend
heroku create postmortem-backend
heroku config:set GROQ_API_KEY=your_key
git push heroku main
```

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

---

**Built with ❤️ for SREs and DevOps Engineers**
