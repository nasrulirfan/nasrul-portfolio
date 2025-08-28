"use client";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface Skill {
  name: string;
  level: number; // 1-100
  category: "frontend" | "backend" | "database" | "devops" | "tools" | "other";
  icon?: string;
  description?: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
  color: string;
}

const skillsData: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 95, category: "frontend", description: "Advanced component architecture & hooks" },
      { name: "Next.js", level: 90, category: "frontend", description: "SSR, SSG, and App Router expertise" },
      { name: "TypeScript", level: 88, category: "frontend", description: "Type-safe development practices" },
      { name: "Tailwind CSS", level: 92, category: "frontend", description: "Responsive design & custom components" },
      { name: "JavaScript", level: 95, category: "frontend", description: "ES6+, async/await, and modern patterns" },
      { name: "HTML5 & CSS3", level: 93, category: "frontend", description: "Semantic markup & advanced styling" },
    ]
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 90, category: "backend", description: "RESTful APIs & microservices" },
      { name: "Express.js", level: 88, category: "backend", description: "Middleware & routing expertise" },
      { name: "Python", level: 85, category: "backend", description: "Django, FastAPI, and automation" },
      { name: "GraphQL", level: 80, category: "backend", description: "Schema design & resolvers" },
      { name: "REST APIs", level: 93, category: "backend", description: "API design & documentation" },
      { name: "Microservices", level: 82, category: "backend", description: "Distributed architecture patterns" },
    ]
  },
  {
    title: "Database & Storage",
    icon: "🗄️",
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "PostgreSQL", level: 88, category: "database", description: "Complex queries & optimization" },
      { name: "MongoDB", level: 85, category: "database", description: "Document modeling & aggregation" },
      { name: "Redis", level: 80, category: "database", description: "Caching & session management" },
      { name: "MySQL", level: 82, category: "database", description: "Relational database design" },
      { name: "Firebase", level: 78, category: "database", description: "Real-time data & authentication" },
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", level: 85, category: "devops", description: "EC2, S3, Lambda, RDS expertise" },
      { name: "Docker", level: 88, category: "devops", description: "Containerization & orchestration" },
      { name: "Vercel", level: 92, category: "devops", description: "Deployment & edge functions" },
      { name: "GitHub Actions", level: 80, category: "devops", description: "CI/CD pipeline automation" },
      { name: "Nginx", level: 75, category: "devops", description: "Reverse proxy & load balancing" },
    ]
  },
  {
    title: "Tools & Technologies",
    icon: "🛠️",
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "Git", level: 95, category: "tools", description: "Version control & collaboration" },
      { name: "VS Code", level: 93, category: "tools", description: "Extensions & workflow optimization" },
      { name: "Figma", level: 78, category: "tools", description: "Design collaboration & prototyping" },
      { name: "Jest", level: 85, category: "tools", description: "Unit & integration testing" },
      { name: "Webpack", level: 80, category: "tools", description: "Bundle optimization & configuration" },
    ]
  }
];

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground" aria-label={`Proficiency: ${skill.level} percent`}>
          {skill.level}%
        </span>
      </div>
      <div 
        className="h-2 bg-secondary rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency level`}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      {skill.description && (
        <p className="text-xs text-muted-foreground">{skill.description}</p>
      )}
    </div>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
            {category.icon}
          </div>
          <span className="text-lg">{category.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {category.skills.map((skill, index) => (
          <SkillBar key={index} skill={skill} />
        ))}
      </CardContent>
    </Card>
  );
}

export function SkillsSection() {
  // Calculate overall stats
  const totalSkills = skillsData.reduce((acc, category) => acc + category.skills.length, 0);
  const avgSkillLevel = Math.round(
    skillsData.reduce((acc, category) => 
      acc + category.skills.reduce((sum, skill) => sum + skill.level, 0), 0
    ) / totalSkills
  );
  const categories = skillsData.length;

  return (
    <Section id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4">
            Skills & Technologies
          </Heading>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills across the full development stack, 
            from frontend frameworks to cloud infrastructure and development tools.
          </p>
        </div>

        {/* Skills Overview Stats */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          role="region"
          aria-label="Skills overview statistics"
        >
          <div 
            className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
            role="article"
            aria-label="Total technologies mastered"
          >
            <div className="text-3xl font-bold text-primary mb-2" aria-label={`${totalSkills} plus technologies`}>
              <AnimatedCounter end={totalSkills} suffix="+" duration={2} delay={0.3} />
            </div>
            <div className="text-sm font-medium text-foreground">Technologies</div>
            <div className="text-xs text-muted-foreground mt-1">Proficient in various tools</div>
          </div>
          <div 
            className="text-center p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
            role="article"
            aria-label="Average skill proficiency level"
          >
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2" aria-label={`${avgSkillLevel} percent average proficiency`}>
              <AnimatedCounter end={avgSkillLevel} suffix="%" duration={2.5} delay={0.5} />
            </div>
            <div className="text-sm font-medium text-foreground">Average Proficiency</div>
            <div className="text-xs text-muted-foreground mt-1">Across all technologies</div>
          </div>
          <div 
            className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20"
            role="article"
            aria-label="Number of specialization areas"
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2" aria-label={`${categories} specializations`}>
              <AnimatedCounter end={categories} duration={1.5} delay={0.7} />
            </div>
            <div className="text-sm font-medium text-foreground">Specializations</div>
            <div className="text-xs text-muted-foreground mt-1">Areas of expertise</div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <SkillCard category={category} />
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <Heading level={3} size="lg" className="mb-6">
            Additional Competencies
          </Heading>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Agile/Scrum", "Technical Writing", "Code Review", "Mentoring", 
              "Performance Optimization", "SEO", "Accessibility", "Security Best Practices",
              "API Design", "Database Design", "System Architecture", "Problem Solving"
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-accent transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}