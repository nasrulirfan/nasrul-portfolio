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
    title: "Frontend Engineering",
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" }
    ]
  },
  {
    title: "Backend & Languages",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "R", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" },
      { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" }
    ]
  },
  {
    title: "Data & Messaging",
    icon: "🗄️",
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "RabbitMQ", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" },
      { name: "Neo4j", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg" }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "GitLab CI/CD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
      { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
      { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" }
    ]
  },
  {
    title: "Monitoring & Tooling",
    icon: "🛡️",
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Sentry", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v13/icons/sentry.svg" },
      { name: "Rollbar", logo: "https://avatars.githubusercontent.com/u/3219584?s=200&v=4" },
      { name: "Inspector", logo: "https://avatars.githubusercontent.com/u/11809173?s=200&v=4" },
      { name: "Stripe", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v13/icons/stripe.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "Bash Scripting", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
      { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" }
    ]
  },
  {
    title: "AI-Related Development",
    icon: "🤖",
    color: "from-amber-500 to-orange-500",
    skills: [
      { name: "Claude Code", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v13/icons/anthropic.svg" },
      { name: "Kiro", logo: "https://avatars.githubusercontent.com/u/150204825?s=200&v=4" },
      { name: "Codex", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v13/icons/openai.svg" }
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
              "Microservices Architecture",
              "CI/CD Automation (Jenkins & GitLab)",
              "Stripe Integrations",
              "P4 Networking DSL",
              "Technical Documentation",
              "Code Review & Mentoring",
              "Performance Optimization",
              "Database Optimization",
              "System Architecture",
              "API Integration",
              "Requirements Gathering",
              "Team Leadership",
              "Agile Methodologies",
              "Observability (Sentry, Rollbar, Inspector)"
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
