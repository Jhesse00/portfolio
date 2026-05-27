import { Code2, Shield, Terminal } from 'lucide-react';

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const values = [
  {
    title: "Security First",
    description: "Learning to protect systems with strong security principles.",
    icon: Shield,
  },
  {
    title: "Clean Code",
    description: "Practicing clean and secure coding techniques.",
    icon: Code2,
  },
  {
    title: "Problem Solver",
    description: "Enjoying the process of solving tech and security puzzles.",
    icon: Terminal,
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-accent/50">
      <ScrollReveal className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Me 🎯
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I’m a passionate cybersecurity student 
                with a strong interest in coding and technology. 
                Currently pursuing a degree in cybersecurity, 
                I enjoy learning about protecting digital assets and building secure systems. 
                I created this website from scratch as part of my journey to expand my skills and knowledge.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col items-center space-y-3 rounded-lg border bg-background/40 p-5 text-center shadow-sm transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
                >
                  <value.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
              alt="Cybersecurity Illustration"
              className="rounded-lg object-cover shadow-lg ring-1 ring-border/60"
              width={600}
              height={400}
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
