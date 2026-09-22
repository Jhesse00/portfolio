import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-border bg-background py-20 sm:py-28">
      <div className="section-shell">
        <ScrollReveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="section-title">Projects</h2><p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">Hands-on work across privacy, endpoint diagnostics, technical support, and network infrastructure.</p></div><span className="section-kicker">Selected work</span></ScrollReveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((project, index) => <ScrollReveal key={project.title} className={`h-full ${project.featured ? "md:col-span-2" : ""}`} delay={index * .06}><ProjectCard project={project} /></ScrollReveal>)}</div>
      </div>
    </section>
  );
}
