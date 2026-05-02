# 📡 PostMortem Backend API Documentation

## Base URL

**Local Development:**
```
http://localhost:5000
```

**Production (Render):**
```
https://post-mortem-report-ai-powered.onrender.com
```

---

## Endpoints

### 1. Root Endpoint

**GET /**

Returns API information and available endpoints.

**Request:**
```bash
curl https://post-mortem-report-ai-powered.onrender.com/
```

**Response:**
```json
{
  "status": "online",
  "message": "PostMortem AI Backend is active",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "generate": "/api/generate"
  },
  "documentation": "https://github.com/your-repo/postmortem-app"
}
```

**Status Codes:**
- `200 OK` - Service is running

---

### 2. Health Check

**GET /health**

Returns health status and uptime information.

**Request:**
```bash
curl https://post-mortem-report-ai-powered.onrender.com/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "PostMortem Backend is running",
  "uptime": 3600.5,
  "timestamp": "2026-05-02T15:30:00.000Z"
}
```

**Response Fields:**
- `status` - Service status (OK/ERROR)
- `message` - Human-readable status message
- `uptime` - Server uptime in seconds
- `timestamp` - Current server time (ISO 8601)

**Status Codes:**
- `200 OK` - Service is healthy

**Use Cases:**
- Monitoring and alerting
- Load balancer health checks
- Uptime monitoring services
- CI/CD pipeline verification

---

### 3. Generate Postmortem

**POST /api/generate**

Generates an AI-powered incident postmortem report.

**Request:**
```bash
curl -X POST https://post-mortem-report-ai-powered.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "what": "API gateway returned 503 errors for 45 minutes",
    "when": "2026-05-02T14:32",
    "duration": "45 minutes",
    "severity": "SEV-2",
    "impact": "30% of users couldn'\''t complete checkout",
    "resolution": "Restarted API gateway pods and scaled replicas from 3 to 5"
  }'
```

**Request Body:**
```json
{
  "what": "string (required, 10-5000 chars)",
  "when": "string (required, datetime)",
  "duration": "string (required, 1-100 chars)",
  "severity": "SEV-1 | SEV-2 | SEV-3 | SEV-4 (optional, default: SEV-3)",
  "impact": "string (required, 10-5000 chars)",
  "resolution": "string (required, 10-5000 chars)"
}
```

**Request Fields:**
- `what` - Description of what happened during the incident
- `when` - When the incident occurred (ISO 8601 datetime)
- `duration` - How long the incident lasted
- `severity` - Incident severity level:
  - `SEV-1` - Critical (production down)
  - `SEV-2` - High (major functionality impaired)
  - `SEV-3` - Medium (minor functionality impaired)
  - `SEV-4` - Low (minimal impact)
- `impact` - Who/what was affected
- `resolution` - Steps taken to resolve the incident

**Response:**
```json
{
  "markdown": "## Executive Summary\n\nOn May 2, 2026...",
  "generatedAt": "2026-05-02T15:30:00.000Z",
  "model": "llama3-8b-8192"
}
```

**Response Fields:**
- `markdown` - Generated postmortem in Markdown format
- `generatedAt` - Timestamp when report was generated
- `model` - AI model used for generation

**Status Codes:**
- `200 OK` - Postmortem generated successfully
- `400 Bad Request` - Invalid input data
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

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

## Rate Limiting

**Limits:**
- 10 requests per 15 minutes per IP address

**Headers:**
```
RateLimit-Limit: 10
RateLimit-Remaining: 9
RateLimit-Reset: 1714665600
```

**Rate Limit Exceeded Response:**
```json
{
  "error": "Too many postmortem generation requests. Please try again later.",
  "retryAfter": "15 minutes"
}
```

**Status Code:** `429 Too Many Requests`

---

## CORS Configuration

**Allowed Origins:**
- `http://localhost:5173` (local development)
- `http://localhost:4173` (local preview)
- `https://postmortem-frontend.onrender.com` (production)

**Allowed Methods:**
- `GET`
- `POST`
- `OPTIONS`

**Allowed Headers:**
- `Content-Type`
- `Authorization`

---

## Error Handling

### Validation Errors (400)

**Example:**
```json
{
  "error": "Invalid incident data provided.",
  "details": [
    {
      "field": "duration",
      "message": "Duration is required"
    }
  ]
}
```

### Server Errors (500)

**Example:**
```json
{
  "error": "Failed to generate postmortem. Please try again."
}
```

**Note:** Internal error details are not exposed in production.

---

## Authentication

Currently, the API does not require authentication. The Groq API key is stored securely on the backend.

**Future Enhancement:**
- Add API key authentication
- Implement user accounts
- Add usage tracking

---

## Examples

### Example 1: Critical Incident (SEV-1)

**Request:**
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "what": "Database cluster went down due to disk space exhaustion",
    "when": "2026-05-02T03:15",
    "duration": "2 hours",
    "severity": "SEV-1",
    "impact": "100% of users unable to access the application",
    "resolution": "Cleared old logs, expanded disk space, restored database cluster"
  }'
```

---

### Example 2: Medium Incident (SEV-3)

**Request:**
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "what": "Slow API response times in payment service",
    "when": "2026-05-02T10:30",
    "duration": "30 minutes",
    "severity": "SEV-3",
    "impact": "Payment processing delayed by 5-10 seconds",
    "resolution": "Identified N+1 query issue, optimized database queries"
  }'
```

---

## Testing

### Health Check Test
```bash
# Should return 200 OK
curl -i http://localhost:5000/health
```

### Root Endpoint Test
```bash
# Should return API info
curl http://localhost:5000/
```

### Generate Postmortem Test
```bash
# Should return generated markdown
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "what": "Test incident",
    "when": "2026-05-02T14:32",
    "duration": "10 minutes",
    "severity": "SEV-4",
    "impact": "Test impact",
    "resolution": "Test resolution"
  }'
```

---

## Monitoring

### Uptime Monitoring

Use the `/health` endpoint for monitoring:

**UptimeRobot:**
```
Monitor Type: HTTP(s)
URL: https://post-mortem-report-ai-powered.onrender.com/health
Interval: 5 minutes
```

**Pingdom:**
```
Check Type: HTTP
URL: https://post-mortem-report-ai-powered.onrender.com/health
Check Interval: 1 minute
```

---

### Logging

**Console Logs:**
```
📝 Generating postmortem for incident: API gateway returned 503...
✅ Postmortem generated successfully
```

**Error Logs:**
```
❌ Error generating postmortem: [error details]
❌ GROQ_API_KEY not configured
❌ Invalid Groq API key
```

---

## Performance

**Typical Response Times:**
- Root endpoint: ~10ms
- Health check: ~10ms
- Generate postmortem: ~1-2 seconds

**Factors Affecting Performance:**
- Groq API response time
- Network latency
- Server load

---

## Security

### Implemented:
- ✅ Input validation with Zod
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Error sanitization
- ✅ HTTPS (in production)
- ✅ API key stored securely

### Best Practices:
- Never expose API keys in responses
- Validate all input data
- Sanitize error messages
- Use HTTPS in production
- Implement rate limiting

---

## Troubleshooting

### Issue: "GROQ_API_KEY not configured"

**Cause:** Environment variable not set

**Solution:**
```bash
# Check .env file
cat backend/.env

# Should contain:
GROQ_API_KEY=gsk_your_actual_key
```

---

### Issue: CORS Error

**Cause:** Frontend origin not in allowed list

**Solution:**
Update `ALLOWED_ORIGINS` in `.env`:
```env
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.com
```

---

### Issue: Rate Limit Exceeded

**Cause:** Too many requests from same IP

**Solution:**
- Wait 15 minutes
- Or increase `RATE_LIMIT_MAX_REQUESTS` in `.env`

---

## Changelog

### Version 1.0.0 (2026-05-02)
- ✅ Initial release
- ✅ Root endpoint with API info
- ✅ Enhanced health check with uptime
- ✅ Generate postmortem endpoint
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS protection

---

## Support

**Issues:** Report on GitHub  
**Documentation:** See README.md  
**API Status:** Check `/health` endpoint

---

**Built with ❤️ for SREs and DevOps Engineers**
