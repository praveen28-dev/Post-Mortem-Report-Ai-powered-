# 🚀 Quick Start - Both Servers

## Option B: Terminal Design + Groq Backend

You've chosen the **secure backend architecture** with terminal-style UI.

---

## Start in 3 Commands

### Terminal 1 - Backend Server
```bash
cd backend
npm install
npm run dev
```

**Wait for:**
```
🚀 PostMortem Backend running on port 5000
📍 Environment: development
🔒 CORS enabled for: http://localhost:5173, http://localhost:4173
```

---

### Terminal 2 - Frontend Server
```bash
# From postmortem-app directory
npm install
npm run dev
```

**Wait for:**
```
  VITE v8.0.10  ready in 523 ms

  ➜  Local:   http://localhost:5173/
```

---

### Browser
```
http://localhost:5173
```

---

## What You'll See

```
┌─────────────────────────────────────────────────────────┐
│  ● AI-POWERED · POSTMORTEM GENERATOR                    │
│                                                         │
│  PostMortem.dev                                         │
│  Automate incident documentation for SREs & DevOps     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  📅 INCIDENT TIMING                                     │
│  Occurrence: [datetime]    Duration: [text]            │
│                                                         │
│  ⚠️  SEVERITY & IMPACT                                  │
│  [SEV-1] [SEV-2] [SEV-3] [SEV-4]                       │
│  [Impact textarea]                                      │
│                                                         │
│  💡 SRE Pro Tip                                         │
│  Be specific about impact...                            │
│                                                         │
│  📄 WHAT HAPPENED?                                      │
│  [Description textarea]                                 │
│                                                         │
│  ✓ RESOLUTION STEPS                                     │
│  [Resolution textarea]                                  │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ⚡ GENERATE POSTMORTEM                                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ● llama-3.3-70b-versatile | Built for SREs & DevOps   │
└─────────────────────────────────────────────────────────┘
```

---

## Architecture

```
Frontend (TypeScript)          Backend (Node.js)          Groq API
┌─────────────────┐           ┌─────────────────┐       ┌──────────┐
│  React + Vite   │  ──────>  │  Express.js     │ ───>  │  Llama   │
│  localhost:5173 │  <──────  │  localhost:5000 │ <───  │  3.3-70b │
└─────────────────┘           └─────────────────┘       └──────────┘
  Terminal UI                   Secure Proxy              AI Model
```

---

## Features

- ✅ **Terminal Aesthetic** - Dark UI with grid pattern
- ✅ **TypeScript** - Full type safety
- ✅ **Secure Backend** - API key hidden from browser
- ✅ **Rate Limiting** - 10 requests per 15 minutes
- ✅ **Severity Levels** - SEV-1 to SEV-4
- ✅ **Fast AI** - Groq Llama 3.3 70B model
- ✅ **Validation** - Zod schema validation

---

## Test It

1. Fill out the form
2. Select severity (SEV-1, SEV-2, SEV-3, or SEV-4)
3. Click "GENERATE POSTMORTEM"
4. Watch backend terminal for logs
5. View AI-generated report

---

## Troubleshooting

### Backend won't start
```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

### Frontend won't start
```bash
rm -rf node_modules
npm install
npm run dev
```

### Can't connect to backend
- Check backend is running on port 5000
- Check `.env` has `VITE_BACKEND_URL=http://localhost:5000`
- Restart both servers

---

## Documentation

- 📖 **GROQ_BACKEND_SETUP.md** - Detailed setup guide
- 📖 **README.md** - Main documentation
- 📖 **TERMINAL_REDESIGN_COMPLETE.md** - Design details

---

**Ready to go! Start both servers and open http://localhost:5173** 🚀
