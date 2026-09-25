# Propel Properties

Official web application for **Propel Properties** — your trusted partner in residential, commercial, land, and investment real estate in Nigeria.

## Features

- **Verified Property Portfolio**: Search and filter prime properties across Lekki, Ikoyi, Victoria Island, Ajah, Ibeju-Lekki, Epe, and Abuja.
- **Interactive Investment & Yield Simulator**: Interactive calculator for rental yields, capital growth, and equity returns in the Nigerian property market.
- **Direct Formspree Integration**: Contact submissions, private viewing bookings, property listing requests, and client testimonies route directly to `https://formspree.io/f/mrpblqyr` and `seyiodofin@gmail.com`.
- **Direct WhatsApp Concierge**: Instant 1-click WhatsApp chat pre-filled with property details and enquiry subjects.
- **Fully Responsive & Accessible**: Mobile-first design, fast loading, WCAG AA compliance, and high-performance animations powered by `motion`.

---

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Propel Properties"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New...** > **Project**.
   - Import your GitHub repository (`<your-repo-name>`).
   - The project is pre-configured with `vercel.json` (Framework Preset: **Vite**, Build Command: `vite build`, Output Directory: `dist`).
   - Click **Deploy**.

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start the development server (runs full-stack on port 3000)
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React icons
- **Backend/Proxy**: Express.js, Node.js
- **Tooling**: Vite 8, ESBuild, PostCSS
- **Deployment**: Vercel ready (`vercel.json` included), GitHub Actions compatible
