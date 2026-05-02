# 🚀 Simple Start Guide

## Everything is Ready!

Your terminal-style PostMortem.dev with Groq backend is configured and ready to run.

---

## Start in 2 Steps

### Step 1: Start Backend
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

✅ **Keep this terminal open!**

---

### Step 2: Start Frontend (New Terminal)
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

✅ **Keep this terminal open!**

---

### Step 3: Open Browser
```
http://localhost:5173
```

---

## What You'll See

- 🎨 Dark terminal background with grid pattern
- 🔵 Blue accent color
- ● Animated live badge (pulsing green dot)
- 📊 Severity selector: SEV-1, SEV-2, SEV-3, SEV-4
- 💡 SRE Pro Tip banner
- ⚡ Shimmer effect on generate button
- 📟 Status bar: "llama3-8b-8192"

---

## Test It

1. **Fill the form:**
   - Occurrence: Pick a date/time
   - Duration: "45 minutes"
   - Severity: Click SEV-2
   - Impact: "30% of users affected"
   - What Happened: "API gateway returned 503 errors"
   - Resolution: "Restarted pods, scaled replicas"

2. **Click "GENERATE POSTMORTEM"**

3. **Watch backend terminal:**
   ```
   📝 Generating postmortem for incident...
   ✅ Postmortem generated successfully
   ```

4. **View output in browser**

---

## Architecture

```
Frontend (React TS)  →  Backend (Express)  →  Groq API
localhost:5173          localhost:5000         llama3-8b-8192
```

---

## Dependencies

### Backend (Minimal)
- `express` - Web server
- `groq-sdk` - Groq API client
- `cors` - CORS support
- `dotenv` - Environment variables
- `zod` - Input validation

### Frontend (Minimal)
- `react` - UI framework
- `react-dom` - React DOM
- `typescript` - Type safety
- `vite` - Build tool

---

## Configuration

### Backend (.env)
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

**⚠️ IMPORTANT:** Replace `YOUR_GROQ_API_KEY` with your actual key from https://console.groq.com/

### Frontend (.env) ✅
```env
VITE_BACKEND_URL=http://localhost:5000
```

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

### Can't connect
- Check backend is running on port 5000
- Check frontend is running on port 5173
- Restart both servers

---

## That's It!

✅ Terminal-style UI  
✅ TypeScript  
✅ Groq Backend  
✅ Secure (API key hidden)  
✅ Fast (llama3-8b-8192)  
✅ Free tier friendly  

**Just start both servers and you're done!** 🎉

---

**Built with ❤️ for SREs and DevOps Engineers**
