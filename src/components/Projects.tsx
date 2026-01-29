import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    title: "Home Lab (Linux Server + Docker)",
    description: "Linux home server running Docker services with basic configuration, container lifecycle management, and uptime checks. Includes Pi-hole DNS filtering and Wireshark traffic analysis (DNS/HTTP/TCP) to validate behavior and support troubleshooting.",
    technologies: ["Linux", "Docker", "Pi-hole", "Wireshark", "DNS", "TCP/IP"],
    githubLink: "https://github.com/Jhesse00/",
  }
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col bg-card rounded-lg shadow-lg overflow-hidden border border-accent/20 hover:border-primary/20 transition-colors"
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 flex-grow">
          {project.description}
        </p>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-accent/50 text-accent-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex space-x-3">
            <Button asChild size="sm" variant="outline">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="h-4 w-4 mr-2" />
                View Code
              </a>
            </Button>
            {project.demoLink && (
              <Button asChild size="sm" variant="outline">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="space-y-6 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Projects 🚀
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of projects that show my skills across cybersecurity, systems, and development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};