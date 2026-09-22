import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { OrganizationMark } from "@/components/OrganizationMark";

const skillGroups = [
  { name: "Operating systems", skills: ["Windows 11", "macOS", "Linux"] },
  { name: "IT support", skills: ["Remote support", "Ticketing", "Active Directory", "Microsoft 365"] },
  { name: "Networking", skills: ["TCP/IP", "DNS", "NAT", "VPN", "Wireshark", "pfSense"] },
  { name: "Systems", skills: ["Proxmox", "Docker", "Virtual machines", "Pi-hole"] },
  { name: "Scripting", skills: ["PowerShell", "Python", "Java"] },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border bg-background py-20 sm:py-28">
      <div className="section-shell">
        <ScrollReveal><h2 className="section-title">About Me</h2></ScrollReveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <ScrollReveal className="space-y-5">
            <p className="section-kicker">Overview</p>
            <p className="text-xl leading-relaxed text-[#e7e7e2] sm:text-2xl">I work at the intersection of people, systems, and security.</p>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">I’m an Information Systems and Technology student at NYU with hands-on experience in Windows and Linux support, networking, virtualization, Active Directory, Microsoft 365, and PowerShell. I care about clear communication, repeatable troubleshooting, and building systems people can rely on.</p>
            <div className="flex items-center gap-3 border-t border-border pt-6"><span className="mr-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">Experience &amp; education</span><OrganizationMark organization="autozone" /><OrganizationMark organization="uhaul" /><OrganizationMark organization="nyu" /></div>
          </ScrollReveal>
          <ScrollReveal className="space-y-5" delay={.08}>
            <p className="section-kicker">Skills</p>
            <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {skillGroups.map((group) => <div key={group.name} className="grid gap-3 py-4 sm:grid-cols-[150px_1fr]"><h3 className="text-sm font-medium text-foreground">{group.name}</h3><div className="flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">{skill}</span>)}</div></div>)}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
