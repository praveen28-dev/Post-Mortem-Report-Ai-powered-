# Project Structure Map

src/
├── components/
│   ├── IncidentForm.jsx       # User input fields
│   ├── PostMortemOutput.jsx   # AI result display (Markdown)
│   ├── ExportBar.jsx         # Copy/Download buttons
│   └── Header.jsx            # Branding and Navigation
├── hooks/
│   └── usePostMortem.js      # Logic for Claude API calls
├── utils/
│   ├── pdfExport.js          # jsPDF configuration
│   └── promptTemplates.js    # System prompts for Claude
└── App.jsx                   # Main layout and state management
