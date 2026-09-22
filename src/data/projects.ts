export interface Project {
  title: string;
  description: string;
  category: string;
  status: string;
  period: string;
  outcome: string;
  details: string[];
  technologies: string[];
  githubLink?: string;
  caseStudyLink?: string;
  demoLink?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  { title: "Metadata Privacy Scanner", description: "A privacy-focused browser app that scans files for hidden metadata, flags potential privacy risks, and prepares sanitized images without uploading files.", category: "Security tool", status: "Live demo", period: "Featured build", outcome: "Local-first privacy analysis with no file uploads.", details: ["Inspects file details, hashes, image dimensions, and supported JPEG EXIF metadata.", "Flags privacy-sensitive fields and re-encodes supported images for sanitized download.", "Keeps analysis in the browser rather than sending personal files to a server."], technologies: ["TypeScript", "Browser APIs", "Privacy"], githubLink: "https://github.com/Jhesse00/metadata-scanner", caseStudyLink: "https://github.com/Jhesse00/metadata-scanner#metadata-privacy-scanner-web-app", demoLink: "/metadata-scanner", featured: true },
  { title: "PowerShell Endpoint Triage Utility", description: "Collects endpoint health and support data, then generates a structured HTML report for repeatable troubleshooting and technical documentation.", category: "Automation", status: "Utility", period: "Hands-on project", outcome: "Turns repeated endpoint checks into one documented workflow.", details: ["Collects hostname, user, IP and DNS details, uptime, disk and memory data, and Windows Update status.", "Checks BitLocker, failed logins, printers, mapped drives, installed applications, and recent errors.", "Generates a structured HTML report to support guided diagnostics and escalation."], technologies: ["PowerShell", "Windows", "BitLocker", "Diagnostics"], githubLink: "https://github.com/Jhesse00" },
  { title: "Help Desk Support & Ticketing Lab", description: "Realistic support scenarios for Active Directory, Microsoft 365, VPN, DNS, shared drives, account access, escalation, and resolution verification.", category: "IT support", status: "Lab", period: "Hands-on project", outcome: "Practices complete ticket handling from diagnosis through verification.", details: ["Covers password resets, account lockouts, group access, shared drives, and Microsoft 365.", "Uses ping, nslookup, and ipconfig to diagnose simulated VPN, DNS, and connectivity issues.", "Documents root cause, resolution, escalation notes, and verification for each scenario."], technologies: ["Active Directory", "Microsoft 365", "VPN", "DNS"], githubLink: "https://github.com/Jhesse00" },
  { title: "Home Systems & Networking Lab", description: "A Proxmox lab with Windows and Linux virtual machines, Docker services, pfSense, Pi-hole, isolated networks, and packet-level troubleshooting.", category: "Infrastructure", status: "Lab", period: "Hands-on project", outcome: "Creates a safe environment for systems and network troubleshooting.", details: ["Runs Windows and Linux virtual machines alongside Docker services in Proxmox.", "Uses pfSense, Pi-hole, firewall rules, NAT, and DNS across isolated networks.", "Applies Wireshark to investigate TCP/IP, HTTP, DNS, and connectivity behavior."], technologies: ["Proxmox", "Docker", "pfSense", "Wireshark"], githubLink: "https://github.com/Jhesse00" },
];
