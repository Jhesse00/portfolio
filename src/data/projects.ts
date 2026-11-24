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
  { title: "PowerShell Endpoint Triage Utility", description: "Collects endpoint health and support data, then generates a structured HTML report for repeatable troubleshooting and technical documentation.", category: "Automation", status: "Utility", period: "Hands-on project", outcome: "Turns repeated endpoint checks into one documented workflow.", details: ["Collects hostname, user, IP and DNS details, uptime, disk and memory data, and Windows Update status.", "Checks BitLocker, failed logins, printers, mapped drives, installed applications, and recent errors.", "Generates a structured HTML report to support guided diagnostics and escalation."], technologies: ["PowerShell", "Windows", "BitLocker", "Diagnostics"], githubLink: "https://github.com/Jhesse00/endpoint-triage-pro" },
  { title: "AWS Cloud Threat Detection Lab", description: "An isolated Linux EC2 honeypot exposed to SSH scanning, with CloudWatch log analysis, source-IP enrichment, visualizations, and remediation guidance.", category: "Cloud security", status: "Analysis complete", period: "Hands-on project", outcome: "Analyzed 1,278 failed SSH logins from 44 source IPs; the busiest source made 786 attempts (61.5%).", details: ["Shipped EC2 authentication logs to CloudWatch and exported data for analysis.", "Recomputed event counts and source-IP statistics from tracked CSV data with a Python script.", "Documented mitigations, including restricting SSH and using Systems Manager Session Manager."], technologies: ["AWS EC2", "CloudWatch", "Python", "Threat detection"], githubLink: "https://github.com/Jhesse00/AWS-Cloud-Threat-Detection-Lab" },
  { title: "Home Systems & Networking Lab", description: "A Proxmox VE home lab with an OPNsense firewall, a Bitwarden VM, and a Docker host for DNS filtering, monitoring, and self-hosted services.", category: "Infrastructure", status: "Lab", period: "Hands-on project", outcome: "Provides a safe environment for systems and network troubleshooting.", details: ["Runs an OPNsense firewall and a Bitwarden VM on a Proxmox VE host.", "Runs AdGuard Home, Grafana, cAdvisor, node-exporter, CrowdSec, Nextcloud, Portainer, Dashy, NetAlertX, and WUD on a Docker host.", "Applies Wireshark to investigate TCP/IP, HTTP, DNS, and connectivity behavior."], technologies: ["Proxmox VE", "OPNsense", "Docker", "Grafana"] },
];
