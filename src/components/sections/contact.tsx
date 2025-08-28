"use client";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { useState } from "react";

interface ContactMethod {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  primary?: boolean;
}

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function ContactSection() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(false);

  const loadCalendly = () => {
    if (isCalendlyLoaded || isCalendlyLoading) return;
    
    setIsCalendlyLoading(true);
    
    // Create and load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setIsCalendlyLoaded(true);
      setIsCalendlyLoading(false);
    };
    script.onerror = () => {
      setIsCalendlyLoading(false);
    };
    document.head.appendChild(script);

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  const openCalendly = () => {
    if (!isCalendlyLoaded) {
      loadCalendly();
      // Wait for script to load then open
      const checkInterval = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkInterval);
          window.Calendly.initPopupWidget({ 
            url: 'https://calendly.com/your-username/30min' // Replace with your actual Calendly URL
          });
        }
      }, 100);
    } else {
      window.Calendly.initPopupWidget({ 
        url: 'https://calendly.com/your-username/30min' // Replace with your actual Calendly URL
      });
    }
  };

  const contactMethods: ContactMethod[] = [
    {
      title: "Schedule a Meeting",
      description: "Book a 30-minute call to discuss your project requirements and how I can help bring your ideas to life.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5m-18 0h18" />
        </svg>
      ),
      action: openCalendly,
      primary: true
    },
    {
      title: "Send an Email",
      description: "Prefer email? Drop me a line and I'll get back to you within 24 hours.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      action: () => window.open('mailto:nasrul@example.com?subject=Let\'s%20Work%20Together', '_blank')
    },
    {
      title: "Connect on LinkedIn",
      description: "Let's connect professionally and stay in touch for future opportunities.",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => window.open('https://linkedin.com/in/nasrulirfan', '_blank')
    },
    {
      title: "View My Work",
      description: "Check out my latest projects and contributions on GitHub.",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
        </svg>
      ),
      action: () => window.open('https://github.com/nasrulirfan', '_blank')
    }
  ];

  return (
    <Section id="contact" background="muted">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Heading level={2} className="mb-3">
            Let&apos;s Talk
          </Heading>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Choose the method that works best for you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {contactMethods.map((method, index) => (
            <Card 
              key={index}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 group ${
                method.primary ? 'ring-2 ring-primary/20 hover:ring-primary/40' : ''
              }`}
              onClick={method.action}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    method.primary 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <span className="text-lg">{method.title}</span>
                  {method.primary && (
                    <span className="ml-auto px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Recommended
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Contact Info */}
        <div className="text-center space-y-4">
          <div className="p-4 rounded-xl bg-card border border-border">
            <Heading level={3} size="md" className="mb-3">
              Quick Contact Information
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-muted-foreground">nasrul@example.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-muted-foreground">Malaysia</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-muted-foreground">GMT+8 (Malaysia Time)</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25c0-1.372-.465-2.637-1.244-3.652l-3.226-4.203a2.25 2.25 0 00-1.78-.86H9.75a2.25 2.25 0 00-1.78.86l-3.226 4.203A4.482 4.482 0 002.25 15v1.75z" />
                </svg>
                <span className="text-muted-foreground">Available for remote work</span>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Usually responds within 24 hours
              </span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Heading level={3} size="xl" className="mb-3">
              Or Send a Direct Message
            </Heading>
            <p className="text-muted-foreground">
              Prefer to send a message directly? Fill out the form below.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}