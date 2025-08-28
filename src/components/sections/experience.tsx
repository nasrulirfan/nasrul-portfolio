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
    title: "Senior Full-Stack Developer",
    company: "TechCorp Solutions",
    location: "Kuala Lumpur, Malaysia",
    period: "Jan 2022 - Present",
    type: "full-time",
    description: [
      "Led development of scalable web applications serving 100k+ active users",
      "Architected and implemented microservices using Node.js and Docker",
      "Mentored junior developers and conducted code reviews"
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
    achievements: [
      "Reduced application load time by 40%",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Led team of 5 developers on major product launch"
    ]
  },
  {
    title: "Full-Stack Developer",
    company: "Digital Innovation Hub",
    location: "Remote",
    period: "Mar 2020 - Dec 2021",
    type: "full-time",
    description: [
      "Developed responsive web applications using React and TypeScript",
      "Built RESTful APIs and integrated with third-party services",
      "Collaborated with UX/UI designers to implement pixel-perfect designs"
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express.js"],
    achievements: [
      "Successfully delivered 15+ projects on time",
      "Improved code quality metrics by implementing automated testing",
      "Contributed to 50% increase in client satisfaction scores"
    ]
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    location: "Penang, Malaysia",
    period: "Jun 2019 - Feb 2020",
    type: "contract",
    description: [
      "Created interactive and responsive websites for various clients",
      "Optimized website performance and implemented SEO best practices",
      "Worked closely with design team to ensure brand consistency"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Sass", "Webpack"],
    achievements: [
      "Delivered 20+ client websites with 98% client satisfaction",
      "Improved average website performance score to 95+",
      "Established frontend development standards for the team"
    ]
  },
  {
    title: "Junior Web Developer",
    company: "StartupLab Inc",
    location: "Johor Bahru, Malaysia", 
    period: "Sep 2018 - May 2019",
    type: "full-time",
    description: [
      "Assisted in developing web applications using modern JavaScript frameworks",
      "Participated in agile development processes and daily standups",
      "Learned best practices in software development and version control"
    ],
    technologies: ["JavaScript", "React", "Git", "HTML", "CSS", "Bootstrap"],
    achievements: [
      "Completed comprehensive training program",
      "Successfully contributed to 3 major product releases",
      "Received employee of the month award twice"
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
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;
      const newVisibleItems: number[] = [];

      experienceData.forEach((_, index) => {
        const itemPosition = timelineTop + (index * 300); // Approximate item spacing
        if (scrollPosition > itemPosition + 100) {
          newVisibleItems.push(index);
        }
      });

      setVisibleItems(newVisibleItems);
    };

    window.addEventListener('scroll', handleScroll);
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
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary to-blue-500 hidden md:block transition-all duration-1000 ease-out" 
            style={{
              height: `${(visibleItems.length / experienceData.length) * 100}%`
            }}
            aria-hidden="true"
          />
          
          <div 
            className="space-y-6"
            role="region"
            aria-label="Professional work experience timeline"
          >
            {experienceData.map((experience, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-background hidden md:block transition-all duration-500 ${
                    visibleItems.includes(index) 
                      ? 'bg-primary scale-110 shadow-lg shadow-primary/20' 
                      : 'bg-border scale-100'
                  }`} 
                  aria-hidden="true"
                />
                
                {/* Experience Card */}
                <Card 
                  className={`md:ml-16 hover:shadow-lg transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-30 translate-y-4'
                  }`}
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
            ))}
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
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm font-medium text-foreground">Projects Delivered</div>
          </div>
        </div>
      </div>
    </Section>
  );
}