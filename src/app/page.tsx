import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { SkipLink } from "@/components/ui/skip-link";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <ScrollProgress />
      <Header />
      
      <main id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <Section id="hero" className="pt-16 md:pt-24">
          <div className="text-center">
            <AnimatedSection animation="fade-in" delay={0.2}>
              <Heading level={1} className="mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Full-Stack Developer
              </Heading>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={0.4}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Passionate about creating exceptional digital experiences with modern web technologies
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#contact">Get In Touch</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                    Download CV
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </Section>

        {/* Features Section */}
        <Section id="features" background="muted">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="slide-in-left" delay={0.1}>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  🎨
                </div>
                <Heading level={3} size="lg" className="mb-3">
                  Modern Design
                </Heading>
                <p className="text-muted-foreground">
                  Clean, responsive designs with attention to user experience and accessibility
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={0.2}>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  ⚡
                </div>
                <Heading level={3} size="lg" className="mb-3">
                  Performance
                </Heading>
                <p className="text-muted-foreground">
                  Optimized applications with fast loading times and smooth interactions
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-right" delay={0.3}>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  🚀
                </div>
                <Heading level={3} size="lg" className="mb-3">
                  Innovation
                </Heading>
                <p className="text-muted-foreground">
                  Always exploring new technologies and best practices to deliver cutting-edge solutions
                </p>
              </div>
            </AnimatedSection>
          </div>
        </Section>

        {/* About Section */}
        <AnimatedSection animation="fade-in">
          <AboutSection />
        </AnimatedSection>
        
        {/* Experience Section */}
        <AnimatedSection animation="slide-up" delay={0.2}>
          <ExperienceSection />
        </AnimatedSection>
        
        {/* Skills Section */}
        <AnimatedSection animation="fade-in">
          <SkillsSection />
        </AnimatedSection>
        
        {/* Contact Section */}
        <AnimatedSection animation="slide-up" delay={0.1}>
          <ContactSection />
        </AnimatedSection>
      </main>
      
      <Footer />
    </div>
  );
}
