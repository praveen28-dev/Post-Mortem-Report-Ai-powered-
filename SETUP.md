# PostMortem.dev Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Google Gemini API key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**Get your API key:** [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔧 Using the `usePostMortem` Hook

### Basic Usage in App.jsx

```javascript
import usePostMortem from './hooks/usePostMortem';

function App() {
  const { result, isLoading, error, generatePostMortem } = usePostMortem();

  const handleFormSubmit = async (formData) => {
    try {
      const postmortem = await generatePostMortem(formData);
      console.log('Generated postmortem:', postmortem);
    } catch (err) {
      console.error('Failed to generate postmortem:', err);
    }
  };

  return (
    <div>
      <IncidentForm onSubmit={handleFormSubmit} />
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {result && <PostMortemOutput content={result} />}
    </div>
  );
}
```

### Hook API

#### Returns
- **`result`** (string | null): The generated markdown postmortem
- **`isLoading`** (boolean): True while API request is in progress
- **`error`** (string | null): Error message if generation fails
- **`generatePostMortem`** (function): Async function to trigger generation

#### Parameters for `generatePostMortem(formData)`
```javascript
{
  title: string,      // Incident title
  dateTime: string,   // ISO datetime string
  duration: string,   // e.g., "45 mins"
  severity: string,   // "Low" | "Medium" | "High" | "Critical"
  rawDetails: string  // Raw incident logs/notes
}
```

---

## 📋 Generated Postmortem Structure

The hook generates a comprehensive markdown document with:

1. **Executive Summary** - High-level overview
2. **Incident Details** - Structured metadata
3. **Timeline** - Chronological event breakdown
4. **Root Cause Analysis** - 5 Whys methodology
5. **Impact Assessment** - Business and technical impact
6. **Resolution** - How the incident was resolved
7. **Lessons Learned** - Key takeaways
8. **Action Items** - Follow-up tasks with priorities

---

## 🛡️ Error Handling

The hook handles common error scenarios:

- **Missing API Key**: Clear message to check `.env` configuration
- **Invalid API Key**: Authentication failure
- **Rate Limit/Quota**: Too many requests or quota exhausted
- **Safety Filters**: Content flagged by Gemini's safety system
- **Server Error**: Gemini API unavailable
- **Timeout**: Network connectivity issues

All errors are captured in the `error` state and logged to console.

---

## 🔒 Security Notes

⚠️ **Important**: This is a client-side implementation. 

For production deployments:
- Consider implementing a backend proxy to protect your API key
- Use environment-specific API keys
- Implement rate limiting on your end
- Monitor API usage in the Google AI Studio console

---

## 📚 Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini Models Overview](https://ai.google.dev/models/gemini)
- [React Hooks Guide](https://react.dev/reference/react)
