export interface Project {
  title: string;
  description: string;
  categories: string[];
  technologies: string[];
  githubLink: string;
  demoLink?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Metadata Privacy Scanner",
    description: "A privacy-focused web app that scans uploaded files for hidden metadata, flags possible privacy risks, and helps users download a sanitized version.",
    categories: ["Cybersecurity", "Web App", "Privacy", "Python"],
    technologies: ["Python", "Flask", "ExifTool", "Pillow", "PyMuPDF", "Docker", "pytest"],
    githubLink: "https://github.com/Jhesse00/metadata-scanner",
    featured: true,
  },
  {
    title: "Home Lab (Linux Server + Docker)",
    description: "Linux home lab for running Docker services, monitoring uptime, filtering DNS traffic, and analyzing network behavior with Wireshark.",
    categories: ["Home Lab", "Networking", "Automation"],
    technologies: ["Linux", "Docker", "Pi-hole", "Wireshark", "DNS", "TCP/IP"],
    githubLink: "https://github.com/Jhesse00/",
  },
];
