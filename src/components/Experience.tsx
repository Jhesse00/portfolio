import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { OrganizationMark } from "@/components/OrganizationMark";

const roles = [
  { company: "AutoZone", logo: "autozone" as const, role: "Commercial Driver", date: "Aug 2025 — Jun 2026", details: ["Supported commercial customers, including dealerships and local businesses, while coordinating orders, deliveries, and issue resolution.", "Delivered 20–30 commercial orders per shift and verified or processed 100+ product orders weekly.", "Resolved inventory and order discrepancies with a 5–7 person team to minimize delays."] },
  { company: "U-Haul", logo: "uhaul" as const, role: "Remote Customer Service Representative", date: "Mar 2022 — Aug 2022", details: ["Supported 40–60+ customers daily by phone, diagnosing account and service issues and clearly explaining resolutions.", "Documented requests in internal CRM systems, escalated complex cases, and completed 40+ hours of remote support training."] },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border bg-background py-20 sm:py-28">
      <div className="section-shell">
        <ScrollReveal><h2 className="section-title">Experience</h2></ScrollReveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr]">
          <ScrollReveal><p className="section-kicker">Professional journey</p></ScrollReveal>
          <div className="relative border-l border-border pl-7 sm:pl-10">
            {roles.map((role, index) => <ScrollReveal key={role.company} delay={index * .08} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary ring-1 ring-primary/30 sm:-left-[45px]" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="flex items-center gap-3"><OrganizationMark organization={role.logo} /><div><h3 className="text-xl font-medium text-foreground">{role.role}</h3><p className="mt-0.5 text-sm text-muted-foreground">{role.company}</p></div></div><p className="shrink-0 text-xs uppercase tracking-[0.16em] text-muted-foreground/70">{role.date}</p></div>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">{role.details.map((detail) => <li key={detail} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />{detail}</li>)}</ul>
            </ScrollReveal>)}
          </div>
        </div>
        <div id="education" className="scroll-mt-24 mt-20 grid gap-8 border-t border-border pt-12 lg:grid-cols-[220px_1fr]">
          <ScrollReveal><p className="section-kicker">Education</p></ScrollReveal>
          <ScrollReveal className="flex flex-col gap-4 rounded-xl border border-border bg-card/60 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
            <div className="flex gap-4"><OrganizationMark organization="nyu" className="mt-0.5 h-11 w-11" /><div><h3 className="text-xl font-medium text-foreground">New York University</h3><p className="mt-2 text-muted-foreground">B.S. Information Systems and Technology</p><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground/75">Coursework and independent projects focused on IT support, systems administration, networking, scripting, and cybersecurity.</p></div></div>
            <span className="shrink-0 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">Expected May 2028</span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
