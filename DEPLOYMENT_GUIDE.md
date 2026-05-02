# 🚀 PostMortem.dev - Deployment Guide

## ✅ Polish Phase Complete!

All features have been implemented and tested. The application is ready for production deployment.

---

## 📦 What's New in Polish Phase

### 1. **PDF Export Functionality** ✅
- **File**: `src/utils/pdfExport.js`
- **Features**:
  - Converts markdown to formatted PDF
  - Automatic page breaks and text wrapping
  - Professional margins and typography
  - Section-based parsing
  - Sanitized filenames (e.g., `PostMortem_Database_Outage.pdf`)
  - Error handling and validation

### 2. **Enhanced PostMortemOutput** ✅
- PDF download button with loading state
- "Generating..." feedback during PDF creation
- Disabled state while processing
- Incident title passed for filename generation

### 3. **Vercel Configuration** ✅
- `vercel.json` created with optimal settings
- SPA routing configured
- Asset caching headers
- Production environment variables

---

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy from Project Directory
```bash
cd postmortem-app
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **Project name?** postmortem-app (or your choice)
- **Directory?** ./ (current directory)
- **Override settings?** No

#### Step 4: Set Environment Variable
```bash
vercel env add VITE_ANTHROPIC_API_KEY
```

Paste your Anthropic API key when prompted.

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

### Option 2: Deploy via Vercel Dashboard

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - PostMortem.dev complete"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/postmortem-app.git
git push -u origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `postmortem-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 3: Add Environment Variable
1. Go to Project Settings → Environment Variables
2. Add variable:
   - **Name**: `VITE_ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key
   - **Environment**: Production, Preview, Development

#### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

---

## 🔧 Build Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

### Vercel.json Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_ANTHROPIC_API_KEY` | Anthropic Claude API key | `sk-ant-api03-xxxxx` |

### Setting Variables Locally
Create `.env` file in `postmortem-app/`:
```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### Setting Variables in Vercel
```bash
# Via CLI
vercel env add VITE_ANTHROPIC_API_KEY

# Or via Dashboard
Project Settings → Environment Variables → Add
```

---

## 📊 Build Statistics

```
✓ Built successfully in 1.13s
✓ Total modules: 2,159
✓ Output size: 812.89 kB (251.63 kB gzipped)
✓ Chunks: 4 files
✓ No compilation errors
```

### Bundle Breakdown
- **Main bundle**: 812.89 kB (includes React, Anthropic SDK)
- **HTML2Canvas**: 199.56 kB (PDF generation)
- **Index modules**: 151.38 kB (app code)
- **DOMPurify**: 22.44 kB (security)
- **CSS**: 1.78 kB (Tailwind)

---

## 🧪 Pre-Deployment Checklist

- ✅ All components built and tested
- ✅ PDF export functionality working
- ✅ API integration tested
- ✅ Error handling implemented
- ✅ Loading states functional
- ✅ Responsive design verified
- ✅ Build completes without errors
- ✅ Environment variables documented
- ✅ `.gitignore` includes `.env`
- ✅ `vercel.json` configured
- ✅ README and documentation complete

---

## 🔍 Testing Production Build Locally

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Preview Production Build
```bash
npm run preview
```

### Step 3: Test Features
1. Fill out incident form
2. Generate postmortem (requires API key in `.env`)
3. Test Copy button
4. Test PDF download
5. Test "Create New" workflow
6. Test error states (invalid API key)

---

## 🌍 Custom Domain Setup (Optional)

### Step 1: Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `postmortem.dev`)
3. Follow DNS configuration instructions

### Step 2: Configure DNS
Add these records to your DNS provider:

**For apex domain (postmortem.dev):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for Propagation
DNS changes can take up to 48 hours to propagate.

---

## 📈 Post-Deployment Monitoring

### Vercel Analytics
Enable in Project Settings → Analytics to track:
- Page views
- User sessions
- Performance metrics
- Error rates

### Anthropic API Usage
Monitor in [Anthropic Console](https://console.anthropic.com):
- API calls count
- Token usage
- Cost tracking
- Rate limits

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variable Not Working
- Ensure variable name starts with `VITE_`
- Redeploy after adding variables
- Check variable is set for correct environment

### PDF Download Not Working
- Check browser console for errors
- Verify jsPDF is installed: `npm list jspdf`
- Test with shorter content first

### API Errors
- Verify API key is correct
- Check API key has credits
- Ensure key is set in production environment
- Check Anthropic API status

---

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

### Manual Deployments
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ Application loads at your Vercel URL
- ✅ Form accepts input and validates
- ✅ API generates postmortem (with valid key)
- ✅ Copy button works
- ✅ PDF downloads with correct filename
- ✅ "Create New" resets the form
- ✅ Error states display properly
- ✅ Mobile responsive design works

---

## 🚀 You're Live!

Congratulations! PostMortem.dev is now deployed and ready to help SREs automate their incident documentation.

**Share your deployment:**
- Tweet about it with #PostMortemDev
- Add to your portfolio
- Share with your team
- Contribute improvements via GitHub

---

**Built with ❤️ using React, Vite, Tailwind CSS, and Claude AI**
