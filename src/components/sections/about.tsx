import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const aboutData = {
  name: "Wan Nasrul Irfan",
  role: "Full-Stack Developer",
  location: "Malaysia",
  experience: "5+ years",
  description: [
    "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks, cloud architecture, and creating exceptional user experiences.",
    "My expertise spans across front-end technologies like React, Next.js, and TypeScript, as well as back-end development with Node.js, Python, and various databases. I'm particularly interested in performance optimization, accessibility, and clean, maintainable code.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and mentoring."
  ],
  highlights: [
    {
      metric: "50+",
      label: "Projects Completed",
      description: "Successfully delivered web applications"
    },
    {
      metric: "5+",
      label: "Years Experience",
      description: "Professional development experience"
    },
    {
      metric: "15+",
      label: "Technologies",
      description: "Proficient in modern tech stack"
    },
    {
      metric: "100%",
      label: "Client Satisfaction",
      description: "Consistent positive feedback"
    }
  ]
};

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-4">
          <div>
            <Heading level={2} className="mb-3">
              About Me
            </Heading>
            <p className="text-base text-muted-foreground">
              {aboutData.role} based in {aboutData.location}
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a passionate full-stack developer with over 5 years of experience building scalable web applications and digital solutions. I specialize in modern JavaScript frameworks, cloud architecture, and creating exceptional user experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My expertise spans across front-end technologies like React, Next.js, and TypeScript, as well as back-end development with Node.js, Python, and various databases.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="md" asChild>
              <a href="#contact">
                Let&apos;s Work Together
              </a>
            </Button>
            <Button variant="outline" size="md" asChild>
              <a 
                href="/cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </a>
            </Button>
          </div>
        </div>

        {/* Right Column - Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {aboutData.highlights.map((highlight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border bg-card text-center hover:shadow-md transition-shadow"
              role="article"
              aria-label={`${highlight.label}: ${highlight.metric}`}
            >
              <div 
                className="text-2xl font-bold text-primary mb-1"
                aria-label={`${highlight.metric} ${highlight.label}`}
              >
                {highlight.metric.includes('%') ? (
                  <AnimatedCounter 
                    end={parseInt(highlight.metric)} 
                    suffix="%" 
                    duration={2.5}
                    delay={0.5}
                  />
                ) : highlight.metric.includes('+') ? (
                  <>
                    <AnimatedCounter 
                      end={parseInt(highlight.metric)} 
                      suffix="+" 
                      duration={2}
                      delay={0.3}
                    />
                  </>
                ) : (
                  <AnimatedCounter 
                    end={parseInt(highlight.metric)} 
                    duration={1.8}
                    delay={0.2}
                  />
                )}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {highlight.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {highlight.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}