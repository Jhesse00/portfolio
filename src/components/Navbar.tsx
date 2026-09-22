import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href: string) => {
    setIsOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || isOpen ? "border-b border-border bg-background/90 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="section-shell flex h-20 items-center justify-between">
        <button onClick={() => navigate("#home")} className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Johanne Hesse</button>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => <button key={item.href} onClick={() => navigate(item.href)} className="rounded-md px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary">{item.name}</button>)}
          <button onClick={() => navigate("#contact")} className="ml-3 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:brightness-110">Connect</button>
        </div>
        <button onClick={() => setIsOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground md:hidden" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen}>{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>
      <AnimatePresence>
        {isOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-border bg-background px-6 pb-6 md:hidden">
          {[...navItems, { name: "Connect", href: "#contact" }].map((item) => <button key={item.href} onClick={() => navigate(item.href)} className="block w-full border-b border-border py-4 text-left text-sm uppercase tracking-[0.18em] text-muted-foreground last:border-0">{item.name}</button>)}
        </motion.div>}
      </AnimatePresence>
    </nav>
  );
}
