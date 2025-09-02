import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  turnstileToken: z.string().min(1, 'Captcha verification required'),
});

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per window

  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string, clientIP?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secret) {
    console.error('Turnstile secret key not configured');
    return false;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (clientIP) {
      formData.append('remoteip', clientIP);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Create email transporter
function createTransporter() {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error('Email configuration missing');
  }

  return nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
}

// Send email function
async function sendContactEmail(data: z.infer<typeof contactFormSchema>) {
  const transporter = createTransporter();
  const recipientEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 0 5px 5px 0;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>This message was sent from your portfolio contact form.</p>
          <p>Reply directly to this email to respond to ${data.name}.</p>
        </div>
      </div>
    `,
    replyTo: data.email,
  };

  return await transporter.sendMail(mailOptions);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Verify Turnstile
    const isCaptchaValid = await verifyTurnstile(validatedData.turnstileToken, ip);
    if (!isCaptchaValid) {
      return NextResponse.json(
        { error: 'Captcha verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Send email
    await sendContactEmail(validatedData);

    return NextResponse.json(
      { message: 'Message sent successfully! I\'ll get back to you soon.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.issues.map((err) => ({
            field: err.path.map(String).join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    // Handle email configuration errors
    if (error instanceof Error && error.message.includes('Email configuration')) {
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}