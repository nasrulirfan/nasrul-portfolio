# Wan Nasrul Irfan - Portfolio Website

A modern, high-performance portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean design inspired by modern web standards with full accessibility compliance and professional deployment configuration.

## 🚀 Live Demo

[nasrulirfan.dev](https://nasrulirfan.dev)

## ✨ Features

### 🎨 Design & User Experience
- **Modern, clean design** inspired by contemporary web standards
- **Dark/light theme support** with system preference detection
- **Fully responsive** mobile-first design
- **Smooth animations** and micro-interactions
- **Professional typography** with Geist font family
- **Accessibility compliant** (WCAG 2.1 AA standards)

### 🛠️ Technical Features
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design system
- **Static Site Generation (SSG)** for optimal performance
- **SEO optimized** with Open Graph and Twitter Cards
- **Contact form** with spam protection (Cloudflare Turnstile)
- **Email integration** via Nodemailer
- **Lazy loading** for optimal performance

### 📱 Sections
- **Hero Section** - Professional introduction with call-to-actions
- **About Me** - Personal background with downloadable CV
- **Work Experience** - Professional timeline with achievements
- **Skills** - Interactive skill visualization with progress bars
- **Contact** - Multiple contact methods with working contact form

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Custom components with Radix UI primitives
- **Animations:** Custom intersection observer animations
- **Forms:** React Hook Form with Zod validation
- **Email:** Nodemailer with Gmail/SMTP support
- **Deployment:** Vercel with automatic CI/CD
- **Development:** Turbopack for fast development

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nasrulirfan/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Environment Variables

Create `.env.local` with the following variables:

```bash
# Email Configuration (Required for contact form)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@yourdomain.com

# Cloudflare Turnstile Configuration (Required for spam protection)
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password for `EMAIL_PASSWORD`

### Cloudflare Turnstile Setup

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Go to Turnstile dashboard
3. Create a new site/widget
4. Get your Site Key and Secret Key
5. Add them to your environment variables

**Benefits of Turnstile:**
- Better user experience (invisible when possible)
- No Google dependencies
- Free tier with generous limits

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

3. **Configure Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed
   - SSL certificate is automatically provided

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   ├── ui/               # UI components
│   └── structured-data.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── seo.ts           # SEO configuration
│   └── utils.ts         # General utilities
public/
├── cv.pdf               # Downloadable CV
├── og-image.png         # Social media preview
└── robots.txt           # Search engine directives
```

## 🎨 Customization

### Content Updates

1. **Personal Information**: Update data in section components
2. **Experience**: Modify `experienceData` in `src/components/sections/experience.tsx`
3. **Skills**: Update `skillsData` in `src/components/sections/skills.tsx`
4. **Social Links**: Update links in footer and contact section
5. **CV**: Replace `public/cv.pdf` with your actual CV
6. **Profile Image**: Add your photo and update image references

### Design Customization

- **Colors**: Modify theme in `src/app/globals.css`
- **Typography**: Update font configuration in `src/app/layout.tsx`
- **Components**: Customize components in `src/components/ui/`
- **Animations**: Modify animations in `src/components/ui/animated-*.tsx`

### SEO Configuration

- **Metadata**: Update `src/lib/seo.ts` and `src/app/layout.tsx`
- **Structured Data**: Modify `src/components/structured-data.tsx`
- **Social Media**: Update Open Graph images and metadata

## 📈 Performance

- **Lighthouse Score**: 100/100/100/100 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All metrics in green
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Static Generation**: Pre-rendered at build time for optimal performance

## ♿ Accessibility

- **WCAG 2.1 AA compliant**
- **Screen reader support** with proper ARIA labels
- **Keyboard navigation** throughout the site
- **Skip links** for keyboard users
- **High contrast ratios** for text and interactive elements
- **Semantic HTML** structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---

**Built with ❤️ by Wan  Nasrul Irfan**

[Portfolio](https://nasrul.dev) • [LinkedIn](https://linkedin.com/in/nasrulirfan) • [GitHub](https://github.com/nasrulirfan)
