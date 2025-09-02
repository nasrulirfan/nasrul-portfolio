# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run preview         # Build and start production server

# Quality checks
npm run typecheck       # TypeScript type checking
npm run lint           # ESLint code quality check

# Utilities
npm run clean          # Remove .next build directory
npm run build:analyze  # Analyze bundle size with ANALYZE=true

# Docker commands
npm run docker:build   # Build Docker image
npm run docker:dev     # Run development with docker-compose
npm run docker:prod    # Run production with docker-compose
npm run docker:down    # Stop Docker containers
```

## Architecture Overview

This is a **Next.js 15 portfolio website** using the **App Router** with the following key architectural decisions:

### Tailwind CSS v4 Configuration
- Uses `@import "tailwindcss"` instead of traditional `@tailwind` directives
- No `tailwind.config.ts` file - configuration is in `src/app/globals.css` using `@theme` directive
- Custom color system with CSS variables supporting light/dark themes
- PostCSS config uses `@tailwindcss/postcss` plugin

### Component Architecture
```
src/components/
├── ui/           # Reusable UI primitives (Button, Card, etc.)
├── layout/       # Layout-specific components (Header, Footer)
├── sections/     # Page sections (About, Experience, Skills, Contact)
└── [root level]  # Specialized components (ThemeProvider, ContactForm)
```

### Server vs Client Components
- **Server Components** (default): Most layout and content components
- **Client Components** (`'use client'`): Interactive components like theme toggle, contact form, animated sections
- API routes in `src/app/api/` handle form submissions and health checks

### Form Handling Pattern
- Uses Zod for validation with detailed error schemas
- Cloudflare Turnstile integration for spam protection
- Rate limiting with in-memory store (15 min window, 5 requests max)
- Nodemailer for email delivery via Gmail/SMTP

### Theme System
- CSS-in-JS theme provider with localStorage persistence
- System theme detection with `prefers-color-scheme`
- Manual light/dark/system theme switching
- CSS variables automatically adapt via `.dark` class toggle

## Key Integration Points

### Environment Variables Required
```bash
# Email (required for contact form)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@yourdomain.com

# Cloudflare Turnstile (required for contact form)
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

### Custom Utilities
- `cn()` function in `src/lib/utils.ts` combines `clsx` and `tailwind-merge` for conditional classes
- Component variants pattern using object-based styling (see Button component)
- TypeScript interfaces for all props and data structures

### API Route Pattern
- All API routes return structured JSON with proper error handling
- Rate limiting implemented at the route level
- Validation errors return detailed field-specific messages
- Security headers configured in `next.config.ts`

### Animation System
- Custom intersection observer-based animations in `animated-section.tsx`
- CSS keyframes defined in `globals.css`
- Smooth scroll behavior and progress tracking

## Important Notes

- Uses **standalone output** for Docker deployments
- **No traditional CSS files** - everything is Tailwind utilities or CSS-in-JS
- **TypeScript strict mode** enabled - all components must be properly typed  
- **Security headers** configured for production deployment
- **Image optimization** configured for multiple formats and sizes
- Contact form requires both email configuration and Cloudflare Turnstile setup to function