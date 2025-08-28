"use client";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Skill {
  name: string;
  logo: string;
  darkLogo?: string;
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
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { 
        name: "Next.js", 
        logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg"
      },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
    ]
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { 
        name: "Express.js", 
        logo: "https://cdn.worldvectorlogo.com/logos/express-109.svg"
      },
      { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
    ]
  },
  {
    title: "Database & Storage",
    icon: "🗄️",
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { 
        name: "Vercel", 
        logo: "https://cdn.worldvectorlogo.com/logos/vercel.svg"
      },
      { 
        name: "GitHub Actions", 
        logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg"
      },
      { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
    ]
  },
  {
    title: "Tools & Technologies",
    icon: "🛠️",
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" },
      { name: "Webpack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg" },
    ]
  }
];

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors group">
      <div className="relative w-8 h-8 flex-shrink-0 bg-white/10 dark:bg-white/90 rounded-sm p-1 flex items-center justify-center">
        <img
          src={skill.logo}
          alt={`${skill.name} logo`}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            // Fallback if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<div class="w-full h-full bg-muted rounded flex items-center justify-center text-xs font-bold">' + skill.name.charAt(0) + '</div>';
            }
          }}
        />
      </div>
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
    </div>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform duration-300`}>
            {category.icon}
          </div>
          <span className="text-lg">{category.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {category.skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Heading level={2} className="mb-3">
            Skills & Technologies
          </Heading>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Technologies I work with to build modern, scalable applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <SkillCard category={category} />
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-8 text-center">
          <Heading level={3} size="md" className="mb-4">
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