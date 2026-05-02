# 🚀 Setup Instructions

## Prerequisites

- Node.js 18+ installed
- Groq API key (get one at https://console.groq.com/)

---

## Step 1: Get Your Groq API Key

1. Go to https://console.groq.com/
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Create API Key"
5. Copy your API key (starts with `gsk_...`)

**⚠️ IMPORTANT:** Keep this key secret! Never commit it to Git.

---

## Step 2: Configure Backend

### Copy the example file:
```bash
cd backend
cp .env.example .env
```

### Edit `backend/.env`:
```env
GROQ_API_KEY=gsk_your_actual_key_here
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

**Replace `gsk_your_actual_key_here` with your actual Groq API key!**

---

## Step 3: Configure Frontend

### Copy the example file:
```bash
cp .env.example .env
```

The file should contain:
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## Step 4: Install Dependencies

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
# From postmortem-app directory
npm install
```

---

## Step 5: Start the Servers

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

**Expected output:**
```
🚀 PostMortem Backend running on port 5000
📍 Environment: development
🔒 CORS enabled for: http://localhost:5173, http://localhost:4173
```

### Terminal 2 - Frontend:
```bash
npm run dev
```

**Expected output:**
```
  VITE v8.0.10  ready in 523 ms
  ➜  Local:   http://localhost:5173/
```

---

## Step 6: Open Browser

Navigate to: **http://localhost:5173**

---

## Verify It Works

1. Fill out the incident form
2. Select a severity level (SEV-1 to SEV-4)
3. Click "GENERATE POSTMORTEM"
4. Check backend terminal for logs:
   ```
   📝 Generating postmortem for incident...
   ✅ Postmortem generated successfully
   ```
5. View the AI-generated report in the browser

---

## Troubleshooting

### "GROQ_API_KEY not configured"
- Check `backend/.env` file exists
- Verify `GROQ_API_KEY` is set correctly
- Make sure there are no extra spaces or quotes
- Restart the backend server

### "Cannot find module 'groq-sdk'"
```bash
cd backend
rm -rf node_modules
npm install
```

### "Failed to fetch" or "Network error"
- Check backend is running on port 5000
- Check `VITE_BACKEND_URL` in frontend `.env`
- Restart both servers

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

---

## Security

⚠️ **NEVER commit `.env` files to Git!**

See [SECURITY_NOTICE.md](./SECURITY_NOTICE.md) for:
- How to handle API keys securely
- What to do if you accidentally commit a key
- Best practices for environment variables

---

## Next Steps

- Read [START.md](./START.md) for quick start commands
- Read [SIMPLE_START.md](./SIMPLE_START.md) for detailed guide
- Read [SECURITY_NOTICE.md](./SECURITY_NOTICE.md) for security best practices

---

**Built with ❤️ for SREs and DevOps Engineers**
