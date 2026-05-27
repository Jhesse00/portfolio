import { ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const categoryBadgeClassName = "px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/15 transition-colors";
const technologyBadgeClassName = "px-2.5 py-1 text-xs rounded-full bg-accent/50 text-accent-foreground transition-colors";

function ProjectBadge({ children, className }: { children: string; className: string }) {
  return <span className={className}>{children}</span>;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col bg-card rounded-lg shadow-lg overflow-hidden border border-accent/20 transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl">
      <div className="p-6 md:p-7 flex flex-col flex-grow gap-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>
            {project.featured && (
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/20 motion-safe:animate-featured-pulse">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <ProjectBadge key={category} className={categoryBadgeClassName}>
                {category}
              </ProjectBadge>
            ))}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="space-y-5 pt-1">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <ProjectBadge key={technology} className={technologyBadgeClassName}>
                {technology}
              </ProjectBadge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
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
    </div>
  );
}
