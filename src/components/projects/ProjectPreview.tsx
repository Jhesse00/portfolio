import { useState } from "react";
import { Check, ChevronRight, FileImage, HardDrive, Lock, Network, Server, ShieldCheck, Wifi } from "lucide-react";
import type { Project } from "@/data/projects";

function ScannerPreview() {
  const [scanned, setScanned] = useState(false);
  return <div className="flex h-full flex-col bg-[#f7f7f7] p-3 text-[#171717]">
    <div className="flex items-center justify-between border-b border-black/10 pb-2 text-[8px] font-semibold"><span>METADATA SCANNER</span><ShieldCheck className="h-3 w-3" /></div>
    <button onClick={() => setScanned(true)} className="mt-3 flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-black/20 bg-white text-center transition-colors hover:bg-[#fafafa]" aria-label="Run miniature metadata scan">
      {scanned ? <><Check className="h-5 w-5 text-emerald-600" /><span className="mt-1 text-[9px] font-semibold">3 privacy risks found</span><span className="mt-0.5 text-[7px] text-black/45">GPS • Device • Timestamp</span></> : <><FileImage className="h-5 w-5 text-black/50" /><span className="mt-1 text-[9px] font-semibold">photo.jpg</span><span className="mt-0.5 text-[7px] text-black/45">Click to scan locally</span></>}
    </button>
  </div>;
}

function TerminalPreview() {
  const [running, setRunning] = useState(false);
  return <button onClick={() => setRunning((value) => !value)} className="h-full w-full bg-[#090b0d] p-3 text-left font-mono text-[8px] leading-4 text-[#a3a3a3]" aria-label="Run miniature endpoint triage">
    <div className="mb-2 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-400/70" /><span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" /><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" /></div>
    <p className="text-[#f5f5f0]">PS C:\&gt; .\Invoke-Triage.ps1</p><p className="text-cyan-400">Collecting endpoint health...</p>
    {running ? <div className="mt-1 grid grid-cols-2 gap-x-3"><span>Uptime</span><span className="text-emerald-400">14d 06h</span><span>Disk</span><span>68% free</span><span>BitLocker</span><span className="text-emerald-400">Protected</span><span>Failed logins</span><span className="text-amber-300">3</span></div> : <p className="mt-3 animate-pulse text-[#737373]">Click to run triage_</p>}
  </button>;
}

function TicketPreview() {
  const tickets = [{ id: "INC-1042", text: "Account locked", tone: "text-amber-300" }, { id: "INC-1038", text: "VPN unavailable", tone: "text-red-300" }, { id: "REQ-1031", text: "M365 access", tone: "text-cyan-300" }];
  const [active, setActive] = useState(0);
  return <div className="h-full bg-[#101113] p-3"><div className="mb-2 flex items-center justify-between text-[8px] font-semibold uppercase tracking-wider text-[#737373]"><span>Support queue</span><span>3 open</span></div><div className="space-y-1.5">{tickets.map((ticket, index) => <button key={ticket.id} onClick={() => setActive(index)} className={`flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left text-[8px] transition-colors ${active === index ? "border-white/20 bg-white/[0.08]" : "border-white/[0.05] bg-white/[0.025]"}`}><span className={`h-1.5 w-1.5 rounded-full bg-current ${ticket.tone}`} /><span className="text-[#737373]">{ticket.id}</span><span className="flex-1 text-[#d4d4d4]">{ticket.text}</span><ChevronRight className="h-2.5 w-2.5 text-[#525252]" /></button>)}</div></div>;
}

function NetworkPreview() {
  const [online, setOnline] = useState(true);
  const nodes = [{ icon: Wifi, label: "WAN", pos: "left-3 top-[42%]" }, { icon: Lock, label: "pfSense", pos: "left-[38%] top-[15%]" }, { icon: Server, label: "Proxmox", pos: "right-3 top-[42%]" }, { icon: HardDrive, label: "Docker", pos: "left-[38%] bottom-2" }];
  return <button onClick={() => setOnline((value) => !value)} className="relative h-full w-full overflow-hidden bg-[#0d1012]" aria-label="Toggle miniature network status"><svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 120" aria-hidden="true"><path d="M42 62 L132 30 L258 62 L132 98 Z M132 30 L132 98" fill="none" stroke={online ? "#2f6f60" : "#4a3030"} strokeWidth="1" strokeDasharray="4 4" /></svg>{nodes.map(({ icon: Icon, label, pos }) => <span key={label} className={`absolute ${pos} flex w-14 flex-col items-center rounded-md border border-white/10 bg-[#17191c] p-1.5 text-[7px] text-[#a3a3a3]`}><Icon className={`mb-1 h-3 w-3 ${online ? "text-emerald-400" : "text-red-400"}`} />{label}</span>)}<span className={`absolute right-2 top-2 text-[7px] ${online ? "text-emerald-400" : "text-red-400"}`}>{online ? "● All systems nominal" : "● Link interrupted"}</span></button>;
}

export function ProjectPreview({ project, featured = false }: { project: Project; featured?: boolean }) {
  const preview = project.category === "Security tool" ? <ScannerPreview /> : project.category === "Automation" ? <TerminalPreview /> : project.category === "IT support" ? <TicketPreview /> : <NetworkPreview />;
  return <div className={`overflow-hidden rounded-xl border border-border bg-muted shadow-inner ${featured ? "h-64 sm:h-72 lg:h-full lg:min-h-[360px]" : "h-40"}`}>{preview}</div>;
}
