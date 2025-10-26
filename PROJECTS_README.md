# How to Customize Your Projects

## Quick Start

All project data is stored in `/data/projects.ts`. Edit this file to add your own projects.

## Project Structure

```typescript
{
  slug: "my-project",                    // URL slug: /projects/my-project
  title: "My Project Title",
  description: "Short description",      // Shown on homepage
  longDescription: `                     // Full description in Markdown
    # Project Overview
    Your detailed description here...
  `,
  category: "Cybersecurity",            // Category for color coding
  date: "2024",
  technologies: ["Python", "Linux"],     // Tech stack
  github: "https://github.com/...",      // Optional
  demo: "https://...",                   // Optional
  featured: true,                        // Show with star icon
  images: [],                            // Project screenshots (optional)
  challenges: ["Challenge 1"],           // Challenges faced
  solutions: ["Solution 1"],             // How you solved them
  outcomes: ["Outcome 1"],               // Results achieved
  teamSize: 1,                           // Team size
  duration: "3 months"                   // Project duration
}
```

## Categories

- **Cybersecurity** (Red)
- **Web Development** (Blue)
- **Network Security** (Purple)
- **System Programming** (Green)

## Adding Images

1. Place images in `/public/projects/`
2. Reference them: `images: ["/projects/my-image.png"]`

## Testing

```bash
npm run dev        # Start development server
npm run build      # Build for production
```

Visit http://localhost:3000/#projects to see your changes.

## Current Default Projects

The file contains 3 sample projects with full descriptions:
1. **Network Security Audit** - Cybersecurity project
2. **Full-Stack Web Application** - Web development project  
3. **Network Protocol Analysis** - Network security project

Replace these with your own academic projects!
