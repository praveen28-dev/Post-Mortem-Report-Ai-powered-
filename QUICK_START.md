# Quick Start Guide 🚀

## Prerequisites
- Node.js 18+ installed
- Anthropic API key (get one at https://console.anthropic.com/)

## Setup (3 steps)

### 1. Install Dependencies
```bash
cd postmortem-app
npm install
```

### 2. Add Your API Key
Edit `.env` file:
```env
VITE_ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### 3. Start the App
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## That's It! 🎉

The app is now running with:
- ✅ Dark terminal aesthetic
- ✅ TypeScript
- ✅ Anthropic Claude AI
- ✅ SEV-1 to SEV-4 severity levels
- ✅ Professional SRE-focused UI

Fill out the incident form and click "GENERATE POSTMORTEM" to see it in action!

---

## Build for Production
```bash
npm run build
npm run preview
```

The production build will be in the `dist/` directory.
