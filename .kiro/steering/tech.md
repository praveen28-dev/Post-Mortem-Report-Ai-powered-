# Tech Stack & Constraints

*   **Frontend:** React 18+ with Vite for fast bundling.
*   **Styling:** Tailwind CSS (utility-first, dark mode by default).
*   **LLM Integration:** Google Gemini API (using the `@google/generative-ai` SDK with Gemini 1.5 Flash model).
*   **Export Utilities:** `jsPDF` for PDF generation and `react-markdown` for rendering the AI output.
*   **Deployment:** Vercel (Auto-deploy from main branch).
*   **Architecture:** Client-side only. No dedicated backend; API keys should be handled via environment variables or user-provided input for the MVP.
