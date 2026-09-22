import { useState } from "react";
import { ArrowUpRight, BookOpen, ChevronDown, Github, Play, Star } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`group h-full overflow-hidden rounded-2xl border border-border bg-card/75 transition-all hover:border-primary/35 hover:shadow-[0_24px_70px_-40px_hsl(var(--primary)/.45)] ${project.featured ? "p-5 sm:p-7" : "p-5"}`}>
      <div className={project.featured ? "grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch" : "flex h-full flex-col"}>
        <ProjectPreview project={project} featured={project.featured} />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className={`${project.featured ? "mt-0" : "mt-5"} flex items-start justify-between gap-4`}>
            <div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{project.category}</span><span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{project.status}</span></div>
            {project.featured && <Star className="h-4 w-4 shrink-0 fill-primary text-primary" aria-label="Featured project" />}
          </div>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">{project.period}</p>
          <h3 className="mt-3 text-xl font-medium leading-snug text-foreground sm:text-2xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
          <p className="mt-4 rounded-lg border border-primary/15 bg-primary/[0.06] px-3 py-2 text-xs leading-5 text-foreground/85">{project.outcome}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-border bg-background/35 px-2.5 py-1 text-[11px] text-muted-foreground">{technology}</span>)}</div>
          <button onClick={() => setExpanded((value) => !value)} className="mt-5 flex items-center justify-between border-t border-border pt-4 text-left text-xs font-medium text-foreground" aria-expanded={expanded}><span>{expanded ? "Hide details" : "Open details"}</span><ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} /></button>
          {expanded && <ul className="mt-3 space-y-2 border-l border-primary/25 pl-4 text-xs leading-5 text-muted-foreground">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            {project.demoLink && <a href={project.demoLink} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"><Play className="h-3.5 w-3.5" />Try demo</a>}
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><Github className="h-3.5 w-3.5" />Code<ArrowUpRight className="h-3 w-3" /></a>}
            {project.caseStudyLink && <a href={project.caseStudyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><BookOpen className="h-3.5 w-3.5" />Case study</a>}
          </div>
        </div>
      </div>
    </article>
  );
}
