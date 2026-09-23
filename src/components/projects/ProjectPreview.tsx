import { useState } from "react";
import { Check, ChevronRight, FileImage, HardDrive, Lock, Network, Server, ShieldCheck, Wifi } from "lucide-react";
import type { Project } from "@/data/projects";

function ScannerPreview() {
  const [scanned, setScanned] = useState(false);
  return (
    <div className="flex h-full flex-col bg-[#0f1115] p-3.5 text-[#e5e5e5]">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[9px] font-semibold tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-primary" />METADATA PRIVACY SCANNER</span>
        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[8px] text-primary">Local-First</span>
      </div>
      <button
        onClick={() => setScanned(true)}
        className="btn-tactile mt-3 flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.14] bg-white/[0.02] p-4 text-center transition-all hover:border-primary/40 hover:bg-white/[0.04]"
        aria-label="Run miniature metadata scan"
      >
        {scanned ? (
          <>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check className="h-4 w-4" />
            </div>
            <span className="mt-2 text-[10px] font-semibold text-foreground">3 Privacy Risks Detected</span>
            <span className="mt-0.5 text-[8px] text-muted-foreground">GPS Coordinates • iPhone 15 Pro • Timestamp</span>
          </>
        ) : (
          <>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.05] text-muted-foreground">
              <FileImage className="h-4 w-4" />
            </div>
            <span className="mt-2 text-[10px] font-semibold text-foreground">sample-photo.jpg</span>
            <span className="mt-0.5 text-[8px] text-muted-foreground">Click to scan locally in browser</span>
          </>
        )}
      </button>
    </div>
  );
}

function TerminalPreview() {
  const [running, setRunning] = useState(false);
  return (
    <button
      onClick={() => setRunning((value) => !value)}
      className="btn-tactile flex h-full w-full flex-col bg-[#090b0e] p-3 text-left font-mono text-[9px] leading-relaxed text-[#a3a3a3] transition-all hover:bg-[#0c0e12]"
      aria-label="Run miniature endpoint triage"
    >
      <div className="mb-2.5 flex items-center justify-between border-b border-white/[0.07] pb-1.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[8px] tracking-wider text-muted-foreground/60">PowerShell • Invoke-Triage.ps1</span>
      </div>
      <p className="text-[#f5f5f0]">PS C:\&gt; .\Invoke-Triage.ps1</p>
      <p className="text-cyan-400">Collecting endpoint diagnostics...</p>
      {running ? (
        <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1 text-[8.5px]">
          <span>Uptime:</span><span className="text-emerald-400">14d 06h 22m</span>
          <span>Disk Space:</span><span className="text-foreground">68% Free (NVMe)</span>
          <span>BitLocker:</span><span className="text-emerald-400">AES-XTS 256-bit</span>
          <span>Failed Logins:</span><span className="text-amber-300">3 (Audited)</span>
        </div>
      ) : (
        <div className="mt-3 flex items-center text-[#737373]">
          <span>Click to execute diagnostic script</span>
          <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle" />
        </div>
      )}
    </button>
  );
}

function TicketPreview() {
  const tickets = [
    { id: "INC-1042", text: "AD Account locked", priority: "P2", tone: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    { id: "INC-1038", text: "GlobalProtect VPN drop", priority: "P1", tone: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
    { id: "REQ-1031", text: "M365 Admin license", priority: "P3", tone: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-full flex-col bg-[#0e1013] p-3 text-[#d4d4d4]">
      <div className="mb-2 flex items-center justify-between text-[8px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-white/[0.06] pb-1.5">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Support Queue</span>
        <span>3 Open Tickets</span>
      </div>
      <div className="space-y-1.5">
        {tickets.map((ticket, index) => (
          <button
            key={ticket.id}
            onClick={() => setActive(index)}
            className={`btn-tactile flex w-full items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-[8.5px] transition-all ${
              active === index ? "border-primary/50 bg-primary/10 shadow-sm" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]"
            }`}
          >
            <span className={`rounded border px-1 py-0.2 text-[7px] font-bold ${ticket.tone}`}>{ticket.priority}</span>
            <span className="font-mono text-muted-foreground">{ticket.id}</span>
            <span className="flex-1 truncate font-medium text-foreground/90">{ticket.text}</span>
            <ChevronRight className="h-2.5 w-2.5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function NetworkPreview() {
  const [online, setOnline] = useState(true);
  const nodes = [
    { icon: Wifi, label: "WAN", pos: "left-3 top-[42%]" },
    { icon: Lock, label: "pfSense", pos: "left-[38%] top-[15%]" },
    { icon: Server, label: "Proxmox", pos: "right-3 top-[42%]" },
    { icon: HardDrive, label: "Docker", pos: "left-[38%] bottom-2" },
  ];
  return (
    <button
      onClick={() => setOnline((value) => !value)}
      className="btn-tactile relative h-full w-full overflow-hidden bg-[#0a0d10] p-3 transition-colors hover:bg-[#0c1014]"
      aria-label="Toggle miniature network status"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 120" aria-hidden="true">
        <path
          d="M42 62 L132 30 L258 62 L132 98 Z M132 30 L132 98"
          fill="none"
          stroke={online ? "hsl(var(--primary) / 0.55)" : "#5a3030"}
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className={online ? "animate-packet-flow" : ""}
        />
      </svg>
      {nodes.map(({ icon: Icon, label, pos }) => (
        <span
          key={label}
          className={`absolute ${pos} card-sheen flex w-14 flex-col items-center rounded-lg border border-white/10 bg-[#14171c]/90 p-1.5 text-[7.5px] text-foreground/80 shadow-md backdrop-blur-sm`}
        >
          <Icon className={`mb-1 h-3 w-3 ${online ? "text-primary" : "text-rose-400"}`} />
          {label}
        </span>
      ))}
      <span className={`absolute right-2 top-2 flex items-center gap-1.5 text-[7.5px] font-medium ${online ? "text-emerald-400" : "text-rose-400"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-emerald-400 animate-ping" : "bg-rose-400"}`} />
        {online ? "Network Active" : "Interrupted"}
      </span>
    </button>
  );
}

export function ProjectPreview({ project, featured = false }: { project: Project; featured?: boolean }) {
  const preview = project.category === "Security tool" ? <ScannerPreview /> : project.category === "Automation" ? <TerminalPreview /> : project.category === "IT support" ? <TicketPreview /> : <NetworkPreview />;
  return <div className={`card-sheen overflow-hidden rounded-xl border border-border/80 bg-muted/50 shadow-inner ${featured ? "h-64 sm:h-72 lg:h-full lg:min-h-[360px]" : "h-40"}`}>{preview}</div>;
}
