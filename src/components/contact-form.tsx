"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Turnstile } from "@marsidev/react-turnstile";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim() || formData.subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!captchaToken) {
      newErrors.general = "Please complete the captcha verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken: captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          // Handle validation errors from server
          const serverErrors: FormErrors = {};
          data.details.forEach((detail: { field: string; message: string }) => {
            serverErrors[detail.field as keyof FormErrors] = detail.message;
          });
          setErrors(serverErrors);
        } else {
          setErrors({ general: data.error || "An error occurred" });
        }
        return;
      }

      // Success
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setCaptchaToken("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ 
        general: "Network error. Please check your connection and try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Send Me a Message</CardTitle>
        <p className="text-center text-muted-foreground">
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div 
              className="p-4 bg-destructive/10 border border-destructive/20 rounded-md"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-destructive">{errors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className={errors.name ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-xs text-destructive" role="alert" aria-live="polite">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={errors.email ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What would you like to discuss?"
              className={errors.subject ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-xs text-destructive">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project or inquiry..."
              rows={5}
              className={errors.message ? "border-destructive" : ""}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          {turnstileSiteKey && (
            <div className="flex justify-center">
              <Turnstile
                siteKey={turnstileSiteKey}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken("")}
                onError={() => setCaptchaToken("")}
                options={{
                  theme: "auto",
                  size: "normal",
                }}
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting || !captchaToken}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your information is secure and will only be used to respond to your inquiry.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}