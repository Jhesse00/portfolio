import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const email = "johannephesse@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-background py-20 sm:py-28">
      <div className="section-shell">
        <ScrollReveal><h2 className="section-title">Let&apos;s Connect</h2></ScrollReveal>
        <ScrollReveal delay={.08} className="mt-10 grid gap-10 rounded-2xl border border-border bg-card/70 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-start">
            <p className="max-w-md text-base leading-7 text-muted-foreground">Have an IT opportunity, a technical project, or a problem worth solving? Email is the most reliable way to reach me.</p>
            <a href={`mailto:${email}?subject=Portfolio%20inquiry`} className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"><Mail className="h-4 w-4" />Email me</a>
          </div>
          <div className="flex flex-col justify-center gap-1 lg:border-l lg:border-white/[0.07] lg:pl-14">
            <div className="flex items-center gap-3 border-b border-border py-3"><Mail className="h-4 w-4 shrink-0 text-primary/70" /><a href={`mailto:${email}`} className="min-w-0 flex-1 truncate text-sm text-muted-foreground underline decoration-primary/25 underline-offset-4 hover:text-foreground">{email}</a><button onClick={copyEmail} className="rounded p-2 text-muted-foreground hover:bg-accent hover:text-primary" aria-label="Copy email address">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button><span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span></div>
            <a href="https://www.linkedin.com/in/johannehesse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border-b border-border py-3 text-sm text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4 text-primary/70" />linkedin.com/in/johannehesse</a>
            <a href="https://github.com/Jhesse00" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 text-sm text-muted-foreground hover:text-foreground"><Github className="h-4 w-4 text-primary/70" />github.com/Jhesse00</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
