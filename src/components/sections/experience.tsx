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
    title: "Senior Software Engineer",
    company: "CompAsia",
    location: "Malaysia",
    period: "July 2024 - Present",
    type: "full-time",
    description: [
      "Led rapid deployment of company-wide e-Invoicing system for Renew+ using Laravel modules to meet tight deadlines",
      "Contributed full stack expertise to Inventory Management System, driving requirements gathering, conducting thorough code reviews, and creating comprehensive technical documentation",
      "Optimized MySQL queries and managed Redis queues and caching to boost performance"
    ],
    technologies: ["Laravel", "Vue.js 3", "MySQL", "AWS (S3, Lambda, RDS, EC2)", "Redis", "Docker", "Rollbar", "Jenkins", "Jira", "Git"],
    achievements: [
      "Successfully integrated Apple APIs into the Inventory Management System",
      "Streamlined operations and improved data synchronization",
      "Implemented performance optimizations for database queries"
    ]
  },
  {
    title: "Middle Senior Software Developer",
    company: "HiTower IT",
    location: "Malaysia",
    period: "Dec 2023 - July 2024",
    type: "full-time",
    description: [
      "Played a pivotal role in transitioning from a monolithic to a microservices architecture, involving architecture design, planning, estimating, development, and documentation",
      "Led the research POCs and implementation of micro-frontends and Laravel Octane (Swoole, RoadRunner & FrankenPHP) which optimizes the performance and enhancing user experience",
      "Mentored junior developers, providing guidance on best practices, design patterns, and professional development"
    ],
    technologies: ["PHP (Laravel 11)", "Vue.js 2 & 3", "PostgreSQL", "RabbitMQ", "Docker", "GitLab CI/CD", "Linux", "nginx", "Jira", "Git"],
    achievements: [
      "Successfully transitioned architecture resulting in substantial improvements in scalability",
      "Enhanced team technical skills through mentoring and knowledge sharing",
      "Conducted code reviews to ensure code quality and adherence to best practices"
    ]
  },
  {
    title: "Software System Development Engineer",
    company: "Intel Corporation",
    location: "Malaysia",
    period: "May 2022 - Dec 2023",
    type: "full-time",
    description: [
      "Implemented highly-efficient packet test framework & SDK for Intel FPGAs product resulting in streamlined testing processes, decreasing significantly manual testing, enhanced product performance, and accelerated time-to-market",
      "Collaborated with the client to develop a database tracker system, ensuring real-time database health monitoring and preventing unused database situations",
      "Developed and designed the user interface for Talent Management Web-Based Apps to empower managers visualize and assess the depths of skills and passions of their talents"
    ],
    technologies: ["Python", "C++", "R", "P4", "React", "PostgreSQL", "Docker", "K8s", "GraphQL", "neo4j", "Linux", "Git"],
    achievements: [
      "Resulted in increased reliability, significant reduction in unused storage, and enhanced data accuracy",
      "Accelerated time-to-market for Intel FPGAs products",
      "Empowered strategic talent assignment through comprehensive UI design"
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
            <div className="text-3xl font-bold text-primary mb-2">4+</div>
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