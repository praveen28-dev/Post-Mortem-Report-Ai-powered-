# Requirements: PostMortem.dev

## Vision
A friction-less, single-page application that transforms messy incident details into professional, structured postmortem documents using AI.

## Functional Requirements
* **Input Interface:** User-friendly form to capture: What happened, When, Duration, Impact, and Resolution.
* **AI Generation:** Integration with Claude API to parse inputs into a structured format.
* **Output Sections:**
    * Executive Summary
    * Incident Timeline
    * Root Cause Analysis (5 Whys)
    * Action Items & Lessons Learned
* **Export Options:** One-click "Copy to Markdown" and "Download as PDF."

## Non-Functional Requirements
* **Zero Authentication:** No login required for immediate utility.
* **Performance:** Postmortem generation should complete within 10 seconds.
* **Mobile Responsive:** Fully functional UI on mobile devices for on-the-go incident reporting.
