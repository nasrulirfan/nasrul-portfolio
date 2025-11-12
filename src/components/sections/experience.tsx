"use client";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type: "full-time" | "contract" | "freelance" | "internship";
  description: string[];
  technologies: string[];
  achievements?: string[];
}

const experienceData: Experience[] = [
  {
    title: "Technical Team Lead",
    company: "Leo AI",
    location: "Remote",
    period: "Aug 2025 - Present",
    type: "freelance",
    description: [
      "Architected and delivered a full-stack platform from the ground up using Next.js, MongoDB, Stripe, and Vercel to automate enterprise-level service delivery",
      "Led the build-out of an AI-powered solution that digitizes and streamlines traditionally expensive compliance consulting workflows",
      "Established comprehensive monitoring with Sentry and proactive alerting to preserve uptime and data integrity",
      "Maintained a disciplined Git workflow and CI/CD automation to accelerate delivery and uphold code quality"
    ],
    technologies: ["Next.js", "Node.js", "React", "MongoDB", "AWS", "Stripe", "Vercel", "Redis", "Docker", "Sentry", "Git", "Agile"],
    achievements: [
      "Delivered the company’s first AI-native compliance automation platform",
      "Reduced operational risk through observability-first engineering practices",
      "Improved deployment velocity with streamlined Git-based workflows"
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "CompAsia",
    location: "Malaysia",
    period: "July 2024 - Present",
    type: "full-time",
    description: [
      "Spearheaded the rapid development and rollout of a company-wide e-Invoicing system by architecting a modular Laravel solution under aggressive timelines",
      "Designed and implemented AWS infrastructure (ALB, EC2, nginx, S3, MongoDB Atlas, CloudFront, Docker) plus Jenkins-based CI/CD pipelines for a new MDM initiative",
      "Led end-to-end delivery of the Inventory Management System—from requirements and design through implementation, documentation, and technical reviews",
      "Established Jenkins CI/CD pipelines for the Inventory Management System and Apple Mobile Device Management System to automate build and deployment flows",
      "Engineered Apple API integrations that streamlined inventory data synchronization and core operational workflows",
      "Boosted application performance through complex MySQL query optimization and robust Redis caching and queueing strategies"
    ],
    technologies: ["Laravel", "Vue.js 3", "MySQL", "MongoDB", "AWS (ALB, EC2, S3, CloudFront)", "Redis", "Docker", "nginx", "Rollbar", "Jenkins", "Jira", "Git"],
    achievements: [
      "Delivered enterprise-wide e-Invoicing and MDM systems on time despite accelerated schedules",
      "Improved deployment reliability with purpose-built Jenkins pipelines",
      "Enhanced performance and data accuracy through database and caching optimizations"
    ]
  },
  {
    title: "Middle Senior Software Developer",
    company: "HiTower IT",
    location: "Malaysia",
    period: "Dec 2023 - July 2024",
    type: "full-time",
    description: [
      "Played a pivotal role in the move from a monolithic platform to microservices, covering architecture design, estimation, development, and documentation to unlock scalability",
      "Pioneered performance optimizations by researching and implementing micro-frontends and Laravel Octane (Swoole, RoadRunner, FrankenPHP) to elevate UX",
      "Established a culture of code quality through rigorous reviews while mentoring junior developers on design patterns and professional growth"
    ],
    technologies: ["PHP (Laravel 11)", "Vue.js 2 & 3", "PostgreSQL", "RabbitMQ", "Docker", "GitLab CI/CD", "Linux", "nginx", "Jira", "Git", "Agile"],
    achievements: [
      "Unlocked substantial scalability wins via microservice adoption",
      "Elevated user experience with micro-frontend and Octane initiatives",
      "Raised overall engineering bar through structured mentoring and reviews"
    ]
  },
  {
    title: "Software System Development Engineer",
    company: "Intel Corporation",
    location: "Malaysia",
    period: "May 2022 - Dec 2023",
    type: "full-time",
    description: [
      "Developed a high-efficiency Python-based packet testing framework and SDK for Intel FPGA products, slashing manual effort and accelerating time-to-market",
      "Engineered a real-time database health monitoring system with Python, PostgreSQL, and Docker to prevent unused database situations and improve reliability",
      "Identified and resolved performance bottlenecks that significantly reduced unused storage and boosted system stability",
      "Designed and built a talent management web application in React and GraphQL that helps managers align projects with employee skills"
    ],
    technologies: ["Python", "C++", "R", "P4", "React", "PostgreSQL", "Docker", "K8s", "GraphQL", "neo4j", "Linux", "Git"],
    achievements: [
      "Accelerated FPGA release cycles with automation-first testing",
      "Protected data accuracy through proactive monitoring solutions",
      "Enabled strategic staffing decisions via bespoke talent tools"
    ]
  },
  {
    title: "Software Engineer",
    company: "PETRONAS Downstream",
    location: "Malaysia",
    period: "Aug 2020 - Feb 2021",
    type: "full-time",
    description: [
      "Initiated and led the development of the converter system and implemented multiple automation scripts which previously required manual resolution resulting an increase work efficiency and productivity"
    ],
    technologies: ["Python (Flask)", "Bootstrap", "MySQL", "Git"],
    achievements: [
      "Increased work efficiency and productivity through automation",
      "Eliminated manual processes with automated converter system",
      "Successfully delivered automation solutions for enterprise operations"
    ]
  }
];

const typeColors = {
  "full-time": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "contract": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "freelance": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  "internship": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
};

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const element = timelineRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate when the element starts and ends being visible
      const startOffset = elementTop - windowHeight;
      const endOffset = elementTop + elementHeight;

      // Current scroll position relative to the element
      const totalScrollDistance = endOffset - startOffset;
      const currentProgress = scrollTop - startOffset;
      
      // Calculate percentage (0 to 100)
      let progressPercentage = (currentProgress / totalScrollDistance) * 100;
      progressPercentage = Math.max(0, Math.min(100, progressPercentage));

      setScrollProgress(progressPercentage);

      // Update visible items based on scroll progress
      const newVisibleItems: number[] = [];
      const itemsToShow = Math.floor((progressPercentage / 100) * experienceData.length * 1.2);
      
      for (let i = 0; i <= Math.min(itemsToShow, experienceData.length - 1); i++) {
        newVisibleItems.push(i);
      }

      setVisibleItems(newVisibleItems);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="experience" background="muted">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Heading level={2} className="mb-3">
            Work Experience
          </Heading>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional career, showcasing growth and achievements 
            in full-stack development.
          </p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline Line - Static Background */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-border/30 hidden md:block" 
            aria-hidden="true"
          />
          
          {/* Timeline Line - Animated Progress */}
          <div 
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-purple-600 hidden md:block transition-all duration-75 ease-out shadow-lg shadow-primary/20" 
            style={{
              height: `${scrollProgress}%`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)'
            }}
            aria-hidden="true"
          />
          
          {/* Glowing dot at the end of the line */}
          {scrollProgress > 0 && (
            <div 
              className="absolute left-6 w-3 h-3 bg-primary rounded-full hidden md:block transition-all duration-75 ease-out animate-pulse shadow-lg shadow-primary/40"
              style={{
                top: `${scrollProgress}%`,
                transform: 'translateY(-50%)',
                filter: 'brightness(1.2)'
              }}
              aria-hidden="true"
            />
          )}
          
          <div 
            className="space-y-6"
            role="region"
            aria-label="Professional work experience timeline"
          >
            {experienceData.map((experience, index) => {
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress / 100) * experienceData.length - index));
              const isVisible = visibleItems.includes(index);
              
              return (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-background hidden md:block transition-all duration-300 ease-out ${
                    isVisible 
                      ? 'bg-primary shadow-lg shadow-primary/40' 
                      : 'bg-border/50'
                  }`} 
                  style={{
                    transform: `scale(${isVisible ? 1.15 + (itemProgress * 0.1) : 0.9})`,
                    filter: isVisible ? `brightness(${1.1 + (itemProgress * 0.2)}) saturate(1.2)` : 'brightness(0.7)',
                    boxShadow: isVisible ? `0 0 ${8 + (itemProgress * 4)}px rgba(59, 130, 246, ${0.3 + (itemProgress * 0.2)})` : 'none'
                  }}
                  aria-hidden="true"
                />
                
                {/* Ripple effect for active dots */}
                {isVisible && (
                  <div 
                    className="absolute left-6 top-6 w-4 h-4 rounded-full border-2 border-primary/30 hidden md:block animate-ping"
                    style={{
                      animationDuration: '2s',
                      opacity: itemProgress * 0.5
                    }}
                    aria-hidden="true"
                  />
                )}
                
                {/* Experience Card */}
                <Card 
                  className={`md:ml-16 hover:shadow-lg transition-all duration-500 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-20 translate-y-6 scale-95'
                  }`}
                  style={{
                    transform: `translateY(${isVisible ? 0 : 24}px) scale(${isVisible ? 1 + (itemProgress * 0.02) : 0.95})`,
                    opacity: isVisible ? 1 : 0.2,
                    filter: isVisible ? `brightness(${1 + (itemProgress * 0.05)})` : 'brightness(0.9)',
                    borderColor: isVisible ? `rgba(59, 130, 246, ${0.1 + (itemProgress * 0.1)})` : 'transparent'
                  }}
                  role="article"
                  aria-label={`${experience.title} at ${experience.company}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div>
                        <Heading level={3} size="lg" className="mb-1">
                          {experience.title}
                        </Heading>
                        <p className="text-primary font-medium">
                          {experience.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {experience.location}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {experience.period}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[experience.type]}`}>
                          {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {experience.description.map((item, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5 text-xs">▶</span>
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    {experience.achievements && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500 mt-1.5 text-xs">✓</span>
                              <span className="text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm font-medium text-foreground">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-sm font-medium text-foreground">Companies</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <div className="text-sm font-medium text-foreground">Technologies Used</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
