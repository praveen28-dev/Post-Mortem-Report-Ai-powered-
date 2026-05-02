# 🚀 API Quick Reference

## Base URL
```
https://post-mortem-report-ai-powered.onrender.com
```

---

## Endpoints

### 1. Root - API Info
```bash
GET /
```
**Response:** API information and available endpoints

---

### 2. Health Check
```bash
GET /health
```
**Response:** Service health status and uptime

---

### 3. Generate Postmortem
```bash
POST /api/generate
Content-Type: application/json

{
  "what": "What happened",
  "when": "2026-05-02T14:32",
  "duration": "45 minutes",
  "severity": "SEV-2",
  "impact": "Who was affected",
  "resolution": "How it was fixed"
}
```
**Response:** AI-generated postmortem in Markdown

---

## Quick Test Commands

### Test Root
```bash
curl https://post-mortem-report-ai-powered.onrender.com/
```

### Test Health
```bash
curl https://post-mortem-report-ai-powered.onrender.com/health
```

### Test Generate
```bash
curl -X POST https://post-mortem-report-ai-powered.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "what": "API gateway returned 503 errors",
    "when": "2026-05-02T14:32",
    "duration": "45 minutes",
    "severity": "SEV-2",
    "impact": "30% of users affected",
    "resolution": "Restarted pods, scaled replicas"
  }'
```

---

## Severity Levels

- **SEV-1** - Critical (production down)
- **SEV-2** - High (major functionality impaired)
- **SEV-3** - Medium (minor functionality impaired)
- **SEV-4** - Low (minimal impact)

---

## Rate Limits

- **10 requests** per 15 minutes per IP
- **429 status** when exceeded

---

## Status Codes

- `200` - Success
- `400` - Bad request (validation error)
- `429` - Rate limit exceeded
- `500` - Server error

---

**Full Documentation:** See `API_DOCUMENTATION.md`
