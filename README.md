# PostMortem.dev 🚀

**AI-Powered Incident Postmortem Generator for SREs & DevOps Engineers**

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![Claude](https://img.shields.io/badge/Claude-Sonnet--4-purple)

---

## Overview

PostMortem.dev is a professional web application that automates incident documentation using AI. Built with a dark terminal aesthetic, it helps SREs and DevOps engineers quickly generate comprehensive postmortem reports.

### Key Features
- 🤖 **AI-Powered** - Uses Anthropic Claude Sonnet 4 for intelligent report generation
- 🎨 **Terminal Aesthetic** - Dark, professional UI inspired by terminal interfaces
- 📊 **Severity Levels** - SEV-1 (Critical) to SEV-4 (Low) classification
- ⚡ **Fast & Responsive** - Built with React 19 and TypeScript
- 🔒 **Type-Safe** - Full TypeScript implementation
- 📱 **Mobile-Friendly** - Responsive design for all devices

---

## Quick Start

### Prerequisites
- Node.js 18 or higher
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd postmortem-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API key:**
   
   Edit `.env` file:
   ```env
   VITE_ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:5173
   ```

That's it! 🎉

---

## Usage

1. **Fill out the incident form:**
   - Occurrence time (when it happened)
   - Duration (how long it lasted)
   - Severity level (SEV-1 to SEV-4)
   - Impact description
   - What happened
   - Resolution steps

2. **Click "GENERATE POSTMORTEM"**

3. **View your AI-generated report** in the output area

4. **Copy and share** with your team

---

## Tech Stack

### Frontend
- **React 19.2** - UI framework
- **TypeScript 5.7** - Type safety
- **Vite 8.0** - Build tool
- **Custom CSS** - Terminal-style design

### AI
- **Anthropic Claude** - Sonnet 4 model
- **@anthropic-ai/sdk** - Official SDK

### Fonts
- **Syne** - Headings and body text
- **JetBrains Mono** - Code, labels, and status

---

## Project Structure

```
postmortem-app/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # App header with live badge
│   │   ├── SeveritySelector.tsx    # SEV-1 to SEV-4 buttons
│   │   ├── ProTip.tsx              # SRE pro tip banner
│   │   ├── FormSection.tsx         # Main incident form
│   │   ├── OutputArea.tsx          # AI output display
│   │   └── StatusBar.tsx           # Bottom status bar
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Terminal-style CSS
│   └── types.ts                    # TypeScript types
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── .env                            # Environment variables
```

---

## Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## Design System

### Colors
- **Background:** `#0a0d12` (Deep terminal black)
- **Accent:** `#63b3ed` (Blue)
- **Text Primary:** `#e2e8f0` (Light gray)
- **Text Muted:** `#718096` (Medium gray)

### Severity Colors
- **SEV-1 Critical:** `#e53e3e` (Red)
- **SEV-2 High:** `#dd6b20` (Orange)
- **SEV-3 Medium:** `#d69e2e` (Yellow)
- **SEV-4 Low:** `#2f855a` (Green)

### Typography
- **Headings/Body:** Syne (Google Fonts)
- **Code/Labels:** JetBrains Mono (Google Fonts)

---

## API Integration

### Anthropic Claude API
```typescript
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

const message = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1000,
  messages: [{ role: 'user', content: prompt }],
});
```

### Prompt Structure
The app generates a structured prompt including:
- Severity level
- Occurrence time
- Duration
- Impact description
- Incident details
- Resolution steps

Claude responds with a comprehensive postmortem including:
- Executive Summary
- Timeline
- Root Cause Analysis
- Impact Summary
- Resolution
- Action Items
- Lessons Learned

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |

**Note:** Prefix with `VITE_` for Vite to expose to the browser.

---

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add `VITE_ANTHROPIC_API_KEY` environment variable
4. Deploy

### Netlify
1. Build the project: `npm run build`
2. Deploy `dist/` folder
3. Add environment variable in Netlify settings

### Other Platforms
Build the project and deploy the `dist/` folder to any static hosting service.

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Security

### API Key Handling
⚠️ **Important:** This app uses a frontend-only architecture, which means the API key is exposed in the browser. For production use, consider:

1. **Backend Proxy:** Implement a server-side proxy to hide the API key
2. **Rate Limiting:** Add rate limiting to prevent abuse
3. **Authentication:** Require user authentication before API access

### Current Implementation
- API key stored in environment variable
- Not committed to Git (`.env` in `.gitignore`)
- Suitable for personal use or trusted environments

---

## Troubleshooting

### "API key not configured" Error
1. Check `.env` file exists in `postmortem-app/`
2. Verify `VITE_ANTHROPIC_API_KEY` is set correctly
3. Restart dev server: `Ctrl+C` then `npm run dev`

### TypeScript Errors
Run the build command to see detailed errors:
```bash
npm run build
```

### Module Not Found
Clear and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3000  // Change to any available port
}
```

---

## Contributing

This is a personal project, but suggestions and feedback are welcome!

---

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## Acknowledgments

- **Anthropic** - For the amazing Claude API
- **React Team** - For React 19
- **Vite Team** - For the blazing-fast build tool
- **Google Fonts** - For Syne and JetBrains Mono

---

## Documentation

- 📖 [Quick Start Guide](./QUICK_START.md)
- 📖 [Terminal Redesign Complete](./TERMINAL_REDESIGN_COMPLETE.md)
- 📖 [Redesign Summary](./REDESIGN_SUMMARY.md)

---

## Support

For issues or questions:
1. Check the documentation files
2. Review the TypeScript errors: `npm run build`
3. Check browser console for runtime errors

---

**Built with ❤️ for SREs and DevOps Engineers**

*Automate your incident documentation and focus on what matters: fixing issues and preventing future incidents.*
