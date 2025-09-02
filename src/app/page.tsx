"use client";

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
        <Section id="hero" className="pt-16 md:pt-20 pb-20 md:pb-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 to-blue-600/3 rounded-full blur-3xl"></div>
          </div>

          <div className="text-center max-w-6xl mx-auto relative">
            {/* Greeting */}
            <AnimatedSection animation="fade-in" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 border border-primary/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for new opportunities
              </div>
            </AnimatedSection>
            
            {/* Main Title */}
            <AnimatedSection animation="slide-up" delay={0.2}>
              <div className="space-y-2 mb-6">
                <p className="text-lg md:text-xl text-muted-foreground">
                  Hey, I&apos;m <span className="text-primary font-semibold">Nas</span> 👋
                </p>
                <Heading level={1} className="text-4xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Full-Stack
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                    Developer
                  </span>
                </Heading>
              </div>
            </AnimatedSection>

            {/* Animated Tech Stack */}
            <AnimatedSection animation="fade-in" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto">
                {[
                  { name: "Laravel", color: "from-red-500 to-red-700" },
                  { name: "Vue.js", color: "from-green-400 to-green-600" },
                  { name: "React", color: "from-blue-400 to-blue-600" },
                  { name: "Python", color: "from-yellow-500 to-yellow-700" },
                  { name: "PHP", color: "from-purple-500 to-purple-700" },
                  { name: "PostgreSQL", color: "from-blue-600 to-blue-800" },
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`px-3 py-1 bg-gradient-to-r ${tech.color} text-white text-xs font-medium rounded-full hover:scale-110 transition-transform duration-300 cursor-default animate-bounce`}
                    style={{ animationDelay: `${index * 0.1}s`, animationDuration: '2s' }}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            {/* Description */}
            <AnimatedSection animation="slide-up" delay={0.6}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Crafting exceptional digital experiences with{' '}
                <span className="text-primary font-semibold">5+ years</span> of expertise in{' '}
                <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold">
                  modern web technologies
                </span>
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="slide-up" delay={0.7}>
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">4</div>
                  <div className="text-xs text-muted-foreground">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">4+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">20+</div>
                  <div className="text-xs text-muted-foreground">Technologies</div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* CTA Buttons */}
            <AnimatedSection animation="slide-up" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <a href="#contact" className="flex items-center gap-2">
                    Let&apos;s Work Together
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="group border-2 hover:bg-primary/5 transform hover:scale-105 transition-all duration-300">
                  <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                </Button>
              </div>
            </AnimatedSection>

            {/* Scroll Indicator */}
            <AnimatedSection animation="fade-in" delay={1.0}>
              <div className="flex flex-col items-center justify-center w-full">
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex flex-col items-center text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer group"
                >
                  <p className="text-sm mb-4 group-hover:text-primary transition-colors font-medium">Discover my journey</p>
                  <svg className="w-6 h-6 group-hover:text-primary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </AnimatedSection>
          </div>
        </Section>


        {/* About Section */}
        <div className="mt-8">
          <AnimatedSection animation="fade-in">
            <AboutSection />
          </AnimatedSection>
        </div>
        
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
