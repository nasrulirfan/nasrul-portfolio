# Deployment Guide

This guide covers how to deploy the Nasrul Portfolio to Vercel and configure all necessary services.

## 🚀 Vercel Deployment

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Domain name (optional, Vercel provides free `.vercel.app` domains)

### Deployment Steps

1. **Connect Repository to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Deploy from CLI (or use Vercel dashboard)
   vercel --prod
   ```

2. **Import Project in Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Build Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`
   - Node.js Version: **18.x** or **20.x**

## 🔧 Environment Variables

Configure these in Vercel Dashboard → Project → Settings → Environment Variables:

### Required Variables
```bash
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@yourdomain.com

# Cloudflare Turnstile (Required for contact form)
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional Variables
```bash
# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Plausible Analytics (Alternative to GA)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Search Console Verification
GOOGLE_SITE_VERIFICATION=your-verification-code
```

## 📧 Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password for `EMAIL_PASSWORD`

3. **Alternative SMTP Providers**:
   - SendGrid, Mailgun, or AWS SES for production
   - Update `createTransporter()` in `/api/contact/route.ts`

## 🛡️ Cloudflare Turnstile Setup

1. **Create Cloudflare Account**:
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Go to Turnstile dashboard
   - Create a new site/widget
   - Get Site Key and Secret Key

2. **Configure Keys**:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` → Frontend (public)
   - `TURNSTILE_SECRET_KEY` → Backend (secret)

3. **Advantages over hCaptcha**:
   - Better user experience (invisible verification when possible)
   - No Google reCAPTCHA dependencies 
   - Integrated with Cloudflare's security features
   - Free tier with generous limits

## 🌐 Custom Domain Setup

1. **Add Domain in Vercel**:
   - Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**:
   - Set `NEXT_PUBLIC_SITE_URL` to your domain
   - Update `metadataBase` in `layout.tsx`

3. **SSL Certificate**:
   - Vercel automatically provides SSL via Let's Encrypt
   - Certificate auto-renews

## 📊 Analytics Setup (Optional)

### Google Analytics 4
```bash
# Add to environment variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Plausible Analytics (Privacy-friendly alternative)
```bash
# Add to environment variables  
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

## 🔍 Search Engine Optimization

1. **Google Search Console**:
   - Add property for your domain
   - Verify ownership using meta tag or DNS
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Update SEO Configuration**:
   - Edit `src/lib/seo.ts` with your domain
   - Update social media handles
   - Replace placeholder images with actual profile photo

## 🚨 Security Headers

The `vercel.json` configuration includes security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## 📁 File Structure for Production

```
nasrul-portfolio/
├── .env.production          # Production environment variables
├── vercel.json             # Vercel configuration
├── public/
│   ├── cv.pdf             # Your actual CV file
│   ├── og-image.png       # Social media preview image
│   └── robots.txt         # Search engine directives
├── src/
│   ├── app/
│   │   └── sitemap.ts     # Dynamic sitemap generation
│   └── lib/
│       └── seo.ts         # SEO configuration
└── DEPLOYMENT.md          # This deployment guide
```

## ✅ Pre-Deployment Checklist

- [ ] Replace placeholder content with your actual information
- [ ] Update CV file (`public/cv.pdf`)
- [ ] Add your profile photo
- [ ] Configure email credentials
- [ ] Set up Cloudflare Turnstile
- [ ] Update social media links
- [ ] Test contact form locally
- [ ] Review and update SEO metadata
- [ ] Configure custom domain (if applicable)

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches
- **Development**: Local development with `npm run dev`

## 🐛 Troubleshooting

### Common Issues

1. **Contact Form Not Working**:
   - Check environment variables are set
   - Verify Turnstile configuration
   - Check email credentials

2. **Build Failures**:
   - Ensure all dependencies are in `package.json`
   - Check TypeScript errors: `npm run typecheck`
   - Verify all imports are correct

3. **Environment Variables Not Working**:
   - Public variables must start with `NEXT_PUBLIC_`
   - Redeploy after adding new environment variables
   - Check variable names match exactly

### Performance Optimization

- Images are optimized with Next.js Image component
- Static assets are automatically optimized by Vercel
- API routes have appropriate caching headers
- CSS is automatically minified and optimized

## 📞 Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Issues](https://github.com/vercel/next.js/issues)

---

**Ready to deploy! 🚀**

Your portfolio is now production-ready with professional deployment configuration, security headers, and performance optimizations.