import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";

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
        <ScrollReveal>
          <h2 className="section-title">Let&apos;s Connect</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <SpotlightCard className="card-sheen mt-10 rounded-2xl border border-border/80 bg-card/70 p-6 shadow-sm transition-all duration-300 hover:border-primary/35 hover:shadow-[0_24px_70px_-25px_hsl(var(--primary)/.22)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Left Column: Context & Direct CTA */}
              <div className="flex flex-col items-start lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for IT &amp; Cybersecurity Roles
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                  Have an opportunity or project worth solving?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Email is the most reliable way to reach me. I usually respond within 24 hours.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${email}?subject=Portfolio%20inquiry`}
                    className="btn-tactile inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:brightness-110"
                  >
                    <Mail className="h-4 w-4" />
                    Email me
                  </a>
                  <button
                    onClick={copyEmail}
                    className="btn-tactile inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border/80 bg-background/60 px-4 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary/60 active:scale-95"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">Copy address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Clean, Perfectly Aligned Interactive Channel Cards */}
              <div className="flex flex-col gap-3 lg:col-span-6 lg:border-l lg:border-white/[0.08] lg:pl-12">
                {/* Email Item */}
                <div className="group flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-3.5 transition-all hover:border-primary/40 hover:bg-secondary/40">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-primary shadow-sm">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">Direct Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="block truncate text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="btn-tactile shrink-0 ml-2 rounded-lg border border-border/60 bg-secondary/40 p-2 text-muted-foreground transition-all hover:border-primary/40 hover:bg-secondary hover:text-foreground active:scale-95"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* LinkedIn Item */}
                <a
                  href="https://www.linkedin.com/in/johannehesse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-3.5 transition-all hover:border-primary/40 hover:bg-secondary/40"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-primary shadow-sm">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">LinkedIn</p>
                      <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        linkedin.com/in/johannehesse
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>

                {/* GitHub Item */}
                <a
                  href="https://github.com/Jhesse00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border/70 bg-background/50 p-3.5 transition-all hover:border-primary/40 hover:bg-secondary/40"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-primary shadow-sm">
                      <Github className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">GitHub</p>
                      <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        github.com/Jhesse00
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
