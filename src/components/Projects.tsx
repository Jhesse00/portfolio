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
    title: "Cybersecurity Dashboard",
    description: "Real-time network threat monitoring and visualization platform.",
    technologies: ["React", "TypeScript", "Node.js", "WebSocket"],
    githubLink: "https://github.com/johanne/cybersec-dashboard",
    demoLink: "https://cybersec-dashboard.vercel.app"
  },
  {
    title: "Security Scanner",
    description: "Automated vulnerability assessment tool built with Python",
    technologies: ["Python", "Docker", "REST API"],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
  },
  {
    title: "Threat Detection System",
    description: "Real-time network monitoring and threat detection platform",
    technologies: ["React", "Node.js", "MongoDB"],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
  },
  {
    title: "Secure Chat App",
    description: "End-to-end encrypted messaging application",
    technologies: ["TypeScript", "WebRTC", "Signal Protocol"],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {project.demoLink && (
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span 
            key={index} 
            className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export function Projects() {
  return (
    <section 
      id="projects" 
      className="container mx-auto px-4 py-16 md:py-24 space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Innovative solutions showcasing my cybersecurity expertise
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;