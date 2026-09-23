import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import profileImage from "../assets/headshot.jpeg";
import { ResumeViewer } from "@/components/ResumeViewer";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pb-16 pt-28 lg:pb-4 lg:pt-20">
      <div className="ambient-studio-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="theme-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="section-shell relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <motion.div initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for IT &amp; Cybersecurity Opportunities</span>
              </div>
            </div>
            <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="card-sheen rounded-full border border-border bg-card/65 px-3 py-1.5 text-xs text-muted-foreground">Information Systems @ NYU</span>
              <span className="card-sheen rounded-full border border-border bg-card/65 px-3 py-1.5 text-xs text-muted-foreground">IT Support &amp; Cybersecurity</span>
            </div>
            <h1 className="text-[clamp(3rem,8vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground">Johanne Hesse</h1>
            <p className="mt-4 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">Information systems student building dependable support, networking, and security solutions.</p>
            <div className="mt-8 flex w-full flex-col gap-3 min-[430px]:w-auto min-[430px]:flex-row">
              <a href="mailto:johannephesse@gmail.com?subject=Portfolio%20inquiry" className="btn-tactile inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:brightness-110"><Mail className="h-4 w-4" />Get in touch</a>
              <ResumeViewer />
            </div>
            <div className="mt-6 flex gap-3">
              <a href="https://github.com/Jhesse00" target="_blank" rel="noopener noreferrer" aria-label="Johanne Hesse on GitHub" className="card-sheen btn-tactile rounded-full border border-border bg-card/50 p-3 text-muted-foreground transition-all hover:border-primary/35 hover:text-primary"><Github className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/johannehesse" target="_blank" rel="noopener noreferrer" aria-label="Johanne Hesse on LinkedIn" className="card-sheen btn-tactile rounded-full border border-border bg-card/50 p-3 text-muted-foreground transition-all hover:border-primary/35 hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5, delay: .1 }} className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-white/[0.06] blur-3xl" />
              <img src={profileImage} alt="Johanne Hesse" className="relative h-44 w-44 rounded-full object-cover object-top ring-1 ring-white/20 shadow-[0_0_55px_-12px_hsl(var(--primary)/0.38)] sm:h-56 sm:w-56 lg:h-80 lg:w-80" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
