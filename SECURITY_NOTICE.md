# 🔒 Security Notice

## API Key Configuration

### ⚠️ IMPORTANT: Never Commit API Keys to Git!

The `.env` files contain sensitive API keys and should **NEVER** be committed to version control.

---

## Setup Instructions

### 1. Backend Configuration

Copy the example file:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and replace `YOUR_GROQ_API_KEY` with your actual key:
```env
GROQ_API_KEY=gsk_your_actual_key_here
```

**Get your Groq API key:** https://console.groq.com/

---

### 2. Frontend Configuration

Copy the example file:
```bash
cp .env.example .env
```

The frontend `.env` should already be configured:
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## Git Configuration

### Files Already in .gitignore

The following files are already excluded from Git:
- `backend/.env`
- `.env`
- `*.env.local`

### Example Files (Safe to Commit)

These files are safe to commit:
- `backend/.env.example`
- `.env.example`

---

## If You Accidentally Committed an API Key

### 1. Revoke the Key Immediately

Go to https://console.groq.com/ and:
1. Delete the exposed API key
2. Generate a new API key
3. Update your local `.env` file with the new key

### 2. Remove from Git History

```bash
# Remove the file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remote (if already pushed)
git push origin --force --all
```

**Note:** This rewrites Git history. Coordinate with your team if working on a shared repository.

### 3. Alternative: Use BFG Repo-Cleaner

```bash
# Install BFG
brew install bfg  # macOS
# or download from https://rtyley.github.io/bfg-repo-cleaner/

# Remove the file
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

---

## Best Practices

### ✅ DO:
- Use `.env.example` files with placeholder values
- Add `.env` to `.gitignore`
- Use environment variables for secrets
- Rotate API keys regularly
- Use different keys for development and production

### ❌ DON'T:
- Commit `.env` files to Git
- Share API keys in documentation
- Hardcode secrets in source code
- Use production keys in development
- Share API keys via email or chat

---

## Environment Variables

### Backend (backend/.env)
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY  # Replace with actual key
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## Production Deployment

### Heroku
```bash
heroku config:set GROQ_API_KEY=your_actual_key
```

### Vercel
```bash
vercel env add VITE_BACKEND_URL
```

Or use the Vercel dashboard:
1. Project Settings → Environment Variables
2. Add `VITE_BACKEND_URL` with your backend URL

---

## Questions?

- **Groq API Docs:** https://console.groq.com/docs
- **Groq Console:** https://console.groq.com/
- **Git Security:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure

---

**Remember: Security is everyone's responsibility!** 🔒
