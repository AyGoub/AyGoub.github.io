# 🛡️ AyGoub - Cybersecurity Portfolio

A modern, responsive portfolio website showcasing my cybersecurity journey, TryHackMe achievements, CTF writeups, and professional experience.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)

## 🌐 Live Demo

Visit the live site: [https://aygoub.github.io/](https://aygoub.github.io/)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Theme**: Modern dark cybersecurity-themed design
- **TryHackMe Integration**: Live stats and achievements from TryHackMe
- **CTF Writeups**: Detailed walkthroughs and solutions
- **Certifications**: Showcase of cybersecurity certifications
- **Interactive Resume**: Embedded CV with download option
- **Contact Form**: EmailJS integration for direct communication
- **Smooth Animations**: Framer Motion for fluid transitions
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
.
├── .github/              # GitHub workflows and configs
│   └── workflows/        # CI/CD workflows
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── About.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Resume.tsx
│   ├── Skills.tsx
│   ├── TryHackMe.tsx
│   └── Writeups.tsx
├── contexts/             # React contexts
├── public/               # Static assets
│   ├── certifications/   # Certificate PDFs
│   ├── cv/              # Resume/CV files
│   ├── logos/           # Technology logos
│   ├── writeups/        # CTF writeup PDFs
│   └── profile-picture.jpg
├── scripts/             # Build and utility scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AyGoub/AyGoub.github.io.git
cd AyGoub.github.io
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

### Local Build

```bash
npm run build
```

### Deploy to GitHub Pages

The project uses GitHub Actions for automatic deployment. Every push to the `main` branch triggers a build and deployment.

Manual deployment:
```bash
npm run build
# The build output will be in the 'out' directory
```

## 🎨 Customization

### Adding New Certifications

1. Add your certificate PDF to `public/certifications/`
2. Update `components/Certifications.tsx` with certificate details

### Adding New Writeups

1. Add your writeup PDF to `public/writeups/`
2. Update `public/writeups/meta.json` with writeup metadata

### Updating Resume

Replace `public/cv/AyGoub_CV.pdf` with your updated CV.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Next.js Configuration

The `next.config.js` is configured for static export to GitHub Pages:

```javascript
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is [MIT](LICENSE) licensed.

## 👤 Author

**Ayoub Goubraim (AyGoub)**

- GitHub: [@AyGoub](https://github.com/AyGoub)
- LinkedIn: [@ayoubgoubraim](https://linkedin.com/in/ayoubgoubraim)
- TryHackMe: [@AyGoub](https://tryhackme.com/p/AyGoub)
- Email: ayoub.goubraim@ecole.ensicaen.fr

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [TryHackMe](https://tryhackme.com/) - Cybersecurity Learning Platform
- [Lucide Icons](https://lucide.dev/) - Icon Library

---

⭐ Star this repo if you found it helpful!
