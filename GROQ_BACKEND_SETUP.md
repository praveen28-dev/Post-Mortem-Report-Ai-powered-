# PostMortem.dev - Groq Backend Setup 🚀

## Architecture: Terminal Design + Groq Backend

You've chosen **Option B**: Terminal aesthetic with secure backend proxy using Groq API.

### Benefits
- ✅ Terminal-style dark UI
- ✅ TypeScript frontend
- ✅ API key hidden on backend (secure)
- ✅ Rate limiting built-in
- ✅ Input validation with Zod
- ✅ Fast Groq Llama model

---

## Quick Start (4 Steps)

### Step 1: Configure Backend API Key

Edit `backend/.env`:
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

**Note:** Replace `YOUR_GROQ_API_KEY` with your actual Groq API key from https://console.groq.com/

---

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `express` - Web server
- `groq-sdk` - Groq API client
- `cors` - CORS support
- `helmet` - Security headers
- `zod` - Input validation
- `express-rate-limit` - Rate limiting
- `dotenv` - Environment variables

---

### Step 3: Start Backend Server

```bash
npm run dev
```

**Expected output:**
```
🚀 PostMortem Backend running on port 5000
📍 Environment: development
🔒 CORS enabled for: http://localhost:5173, http://localhost:4173
```

**Keep this terminal open!**

---

### Step 4: Install & Start Frontend

Open a **new terminal** in the `postmortem-app` directory:

```bash
npm install
npm run dev
```

**Expected output:**
```
  VITE v8.0.10  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 5: Open Browser

Navigate to: **http://localhost:5173**

You should see:
- ✅ Dark terminal background with grid pattern
- ✅ "PostMortem.dev" header
- ✅ Animated live badge
- ✅ Severity selector (SEV-1 to SEV-4)
- ✅ Status bar showing "llama-3.3-70b-versatile"

---

## Testing the Application

1. **Fill out the form:**
   - Occurrence: Select date/time
   - Duration: e.g., "45 minutes"
   - Severity: Click SEV-1, SEV-2, SEV-3, or SEV-4
   - Impact: e.g., "30% of users affected"
   - What Happened: Describe the incident
   - Resolution: Steps taken to fix

2. **Click "GENERATE POSTMORTEM"**

3. **Check backend terminal:**
   ```
   📝 Generating postmortem for incident: API gateway returned 503...
   ✅ Postmortem generated successfully
   ```

4. **View output in browser:**
   - AI-generated postmortem appears
   - Terminal-style formatting
   - Markdown structure

---

## Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ──────> │   Backend   │ ──────> │  Groq API   │
│  (React TS) │ <────── │  (Express)  │ <────── │   (Llama)   │
└─────────────┘         └─────────────┘         └─────────────┘
  localhost:5173        localhost:5000          api.groq.com
```

### Frontend (TypeScript)
- React 19 with TypeScript
- Custom terminal-style CSS
- Calls backend at `http://localhost:5000/api/generate`

### Backend (Node.js)
- Express.js server
- Groq SDK integration
- Rate limiting (10 requests per 15 minutes)
- Input validation with Zod
- CORS protection
- Security headers with Helmet

### API (Groq)
- Model: `llama-3.3-70b-versatile`
- Max tokens: 4096
- Temperature: 0.7
- Fast response times

---

## Environment Variables

### Backend (`backend/.env`)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Groq API Key (NEVER commit this to Git)
GROQ_API_KEY=YOUR_GROQ_API_KEY

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

### Frontend (`postmortem-app/.env`)
```env
# Backend API Configuration
VITE_BACKEND_URL=http://localhost:5000
```

---

## API Endpoint

### POST /api/generate

**Request:**
```json
{
  "what": "API gateway returned 503 errors",
  "when": "2026-05-02T14:32",
  "duration": "45 minutes",
  "severity": "SEV-2",
  "impact": "30% of users couldn't complete checkout",
  "resolution": "Restarted pods, scaled replicas to 5"
}
```

**Response:**
```json
{
  "markdown": "## Executive Summary\n\n...",
  "generatedAt": "2026-05-02T15:30:00.000Z",
  "model": "llama-3.3-70b-versatile"
}
```

**Error Response:**
```json
{
  "error": "Invalid incident data provided.",
  "details": [
    {
      "field": "what",
      "message": "Incident description must be at least 10 characters"
    }
  ]
}
```

---

## Security Features

### Backend Security
- ✅ **API Key Hidden** - Never exposed to browser
- ✅ **Rate Limiting** - 10 requests per 15 minutes per IP
- ✅ **Input Validation** - Zod schema validation
- ✅ **CORS Protection** - Only allowed origins
- ✅ **Security Headers** - Helmet middleware
- ✅ **Error Sanitization** - No internal details leaked

### Frontend Security
- ✅ **No API Key** - Backend handles authentication
- ✅ **Type Safety** - TypeScript validation
- ✅ **Input Sanitization** - Form validation

---

## Troubleshooting

### Backend Won't Start

**Error:** `Cannot find package 'groq-sdk'`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

### Backend Crashes on Request

**Error:** `GROQ_API_KEY not configured`

**Solution:**
1. Check `backend/.env` file exists
2. Verify `GROQ_API_KEY` is set
3. Restart backend: `Ctrl+C` then `npm run dev`

---

### Frontend Can't Connect to Backend

**Error:** `Failed to fetch` or `Network error`

**Solution:**
1. Check backend is running on port 5000
2. Check `VITE_BACKEND_URL` in `.env`
3. Restart frontend: `Ctrl+C` then `npm run dev`

---

### CORS Error

**Error:** `Access-Control-Allow-Origin`

**Solution:**
1. Check `ALLOWED_ORIGINS` in `backend/.env`
2. Make sure it includes `http://localhost:5173`
3. Restart backend

---

### Rate Limit Exceeded

**Error:** `Too many postmortem generation requests`

**Solution:**
- Wait 15 minutes
- Or increase `RATE_LIMIT_MAX_REQUESTS` in `backend/.env`
- Restart backend

---

## Development Workflow

### Starting Development
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd ..
npm run dev
```

### Stopping Development
```bash
# In each terminal
Ctrl+C
```

---

## Production Deployment

### Backend Deployment (Heroku Example)

1. **Create Heroku app:**
   ```bash
   cd backend
   heroku create postmortem-backend
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set GROQ_API_KEY=your_key_here
   heroku config:set NODE_ENV=production
   heroku config:set ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel Example)

1. **Update `.env` for production:**
   ```env
   VITE_BACKEND_URL=https://postmortem-backend.herokuapp.com
   ```

2. **Deploy to Vercel:**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Set environment variable in Vercel:**
   - Dashboard → Settings → Environment Variables
   - Add `VITE_BACKEND_URL` with your backend URL

---

## Cost Analysis

### Groq API
- **Free Tier:** 14,400 requests per day
- **Paid Tier:** $0.59 per million tokens (input)
- **Typical Request:** ~500 tokens = $0.0003

### Hosting
- **Backend:** Heroku free tier or $7/month
- **Frontend:** Vercel free tier

### Total Cost
- **Development:** $0 (free tiers)
- **Production (low traffic):** $0-7/month
- **Production (high traffic):** $7-20/month

---

## Monitoring

### Backend Logs
```bash
# Development
npm run dev
# Shows all requests and errors

# Production (Heroku)
heroku logs --tail
```

### Frontend Logs
- Open browser DevTools (F12)
- Console tab shows API calls and errors

---

## Performance

### Response Times
- **Backend Processing:** ~50ms
- **Groq API Call:** ~2-3 seconds
- **Total Time:** ~2-3 seconds

### Optimization Tips
1. **Caching:** Add Redis for repeated requests
2. **CDN:** Use Cloudflare for static assets
3. **Compression:** Enable gzip in Express
4. **Monitoring:** Add Sentry for error tracking

---

## Summary

✅ **Backend:** Express.js + Groq SDK  
✅ **Frontend:** React + TypeScript  
✅ **Design:** Terminal aesthetic  
✅ **Security:** API key hidden on backend  
✅ **Rate Limiting:** Built-in protection  
✅ **Validation:** Zod schema validation  

**Ready to use!** Just start both servers and open http://localhost:5173

---

## Next Steps

1. ✅ Backend configured with Groq API key
2. ✅ Frontend configured to call backend
3. ✅ Terminal-style UI ready
4. ⏳ Start backend: `cd backend && npm run dev`
5. ⏳ Start frontend: `npm run dev`
6. ⏳ Test the application
7. ⏳ Deploy to production (optional)

---

**Built with ❤️ for SREs and DevOps Engineers**
