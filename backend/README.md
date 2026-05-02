# PostMortem Backend - Secure API Proxy

## 🔒 Security Architecture

This backend acts as a secure proxy between your frontend and the Google Gemini API, ensuring your API key is never exposed to the browser.

### Security Features

- ✅ **API Key Protection**: Gemini API key stored server-side only
- ✅ **Rate Limiting**: 10 requests per 15 minutes per IP
- ✅ **Input Validation**: Zod schema validation on all requests
- ✅ **CORS Protection**: Only allowed origins can access the API
- ✅ **Helmet Security**: HTTP headers hardened against common attacks
- ✅ **Error Sanitization**: No sensitive data leaked in error messages

## 🚀 Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### 4. Test the API

```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "what": "API gateway returned 503 errors",
    "when": "2024-01-15T14:30:00",
    "duration": "45 minutes",
    "impact": "30% of users affected",
    "resolution": "Restarted gateway pods"
  }'
```

## 📡 API Endpoints

### POST `/api/generate`

Generate a postmortem document from incident data.

**Request Body:**
```json
{
  "what": "string (min 10 chars)",
  "when": "string (ISO datetime)",
  "duration": "string",
  "impact": "string (min 10 chars)",
  "resolution": "string (min 10 chars)"
}
```

**Response:**
```json
{
  "markdown": "# Executive Summary\n...",
  "generatedAt": "2024-01-15T14:35:00.000Z"
}
```

**Rate Limit:** 10 requests per 15 minutes per IP

**Error Responses:**
- `400` - Invalid input data
- `429` - Rate limit exceeded
- `500` - Server error

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "PostMortem Backend is running"
}
```

## 🛡️ Security Best Practices

### Production Deployment

1. **Never commit `.env` to Git**
   ```bash
   # Already in .gitignore
   .env
   ```

2. **Use environment variables on hosting platform**
   - Vercel: Project Settings → Environment Variables
   - Render: Environment → Environment Variables
   - Railway: Variables tab

3. **Enable HTTPS only**
   ```javascript
   // In production, enforce HTTPS
   if (process.env.NODE_ENV === 'production') {
     app.use((req, res, next) => {
       if (req.header('x-forwarded-proto') !== 'https') {
         res.redirect(`https://${req.header('host')}${req.url}`);
       } else {
         next();
       }
     });
   }
   ```

4. **Update CORS for production domain**
   ```env
   ALLOWED_ORIGINS=https://yourapp.com,https://www.yourapp.com
   ```

5. **Monitor API usage**
   - Set up Google Cloud billing alerts
   - Monitor rate limit hits in logs
   - Track error rates

## 📊 Monitoring

### Logs

The server logs all requests and errors:

```
🚀 PostMortem Backend running on port 5000
📍 Environment: development
🔒 CORS enabled for: http://localhost:5173
📝 Generating postmortem for incident: API gateway returned 503...
✅ Postmortem generated successfully
```

### Rate Limit Headers

Check rate limit status in response headers:

```
RateLimit-Limit: 10
RateLimit-Remaining: 7
RateLimit-Reset: 1705329600
```

## 🔧 Troubleshooting

### "Server configuration error"

- Check that `GEMINI_API_KEY` is set in `.env`
- Verify the API key is valid at https://aistudio.google.com/app/apikey

### "Not allowed by CORS"

- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart the server after changing `.env`

### "Cannot connect to server"

- Ensure backend is running on port 5000
- Check frontend `.env` has `VITE_BACKEND_URL=http://localhost:5000`
- Verify no firewall is blocking the connection

## 📦 Deployment

### Recommended Platforms

- **Render**: Free tier, auto-deploy from Git
- **Railway**: Simple setup, good free tier
- **Vercel**: Serverless functions (requires slight refactor)
- **Fly.io**: Global edge deployment

### Example: Deploy to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repo
4. Set environment variables:
   - `GEMINI_API_KEY`
   - `ALLOWED_ORIGINS`
   - `NODE_ENV=production`
5. Deploy!

## 📝 License

MIT
