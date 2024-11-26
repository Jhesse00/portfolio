import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import React from 'react';

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Johanne</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cybersecurity Professional
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm hover:text-primary"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <a
              href="mailto:contact@example.com"
              className="flex items-center space-x-2 text-sm hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              <span>contact@example.com</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Johanne. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}