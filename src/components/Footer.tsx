import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Jhesse00",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/johanne-hesse-ab965521a",
    icon: Linkedin,
  },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Me 👋</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cybersecurity Student 👨🏽‍🎓
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links 🔗</h3>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="w-fit text-left text-sm transition-colors hover:text-primary"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect 🌐</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 transition-all duration-200 ease-out hover:bg-accent hover:text-primary motion-safe:hover:-translate-y-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact 📧</h3>
            <a
              href="mailto:johannephesse@gmail.com"
              className="group flex items-center space-x-2 text-sm transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 group-hover:text-primary" />
              <span>johannephesse@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Johanne Hesse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
