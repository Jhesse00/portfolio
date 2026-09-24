import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [time, setTime] = useState("");
  const [tzShort, setTzShort] = useState("");
  const [tzFull, setTzFull] = useState("");

  useEffect(() => {
    const updateClock = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        const now = new Date();
        const parts = new Intl.DateTimeFormat("en-US", { timeZoneName: "short", timeZone: tz }).formatToParts(now);
        const shortTz = parts.find((p) => p.type === "timeZoneName")?.value || tz;
        const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: tz });
        setTime(formattedTime);
        setTzShort(shortTz);
        setTzFull(tz.replace(/_/g, " "));
      } catch {
        const now = new Date();
        setTime(now.toLocaleTimeString());
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const isPastThreshold = window.scrollY > 20;
      setScrolled(isPastThreshold);
      setShowBrand(window.scrollY > 320);
    };
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
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || isOpen ? "border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="section-shell flex h-20 items-center justify-between">
        <div className="flex min-w-[210px] items-center">
          <AnimatePresence mode="wait">
            {showBrand ? (
              <motion.button
                key="brand"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("#home")}
                className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
              >
                Johanne Hesse
              </motion.button>
            ) : (
              <motion.button
                key="clock"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("#home")}
                className="group flex select-none items-center gap-2 rounded-md py-1 text-left text-xs font-medium tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                title={tzFull ? `Your local time • ${tzFull}` : "Local time"}
                aria-label={tzFull ? `Local time: ${time} ${tzShort} (${tzFull})` : "Local clock"}
              >
                <Clock className="h-3.5 w-3.5 text-primary/75 transition-colors group-hover:text-primary" />
                <span className="font-mono text-[13px] tabular-nums text-foreground/90">{time || "—:—:—"}</span>
                {tzShort && <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{tzShort}</span>}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="rounded-md px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => navigate("#contact")}
            className="btn-tactile ml-3 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-sm transition-all hover:brightness-110"
          >
            Connect
          </button>

          {/* Quick Color Scheme Trigger in Navbar */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-palette"))}
            className="btn-tactile group relative ml-1.5 flex h-9 items-center gap-1.5 rounded-md border border-border/80 bg-card/60 px-2.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
            title="Choose color scheme"
            aria-label="Choose color scheme"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full shadow-sm ring-1 ring-white/10"
              style={{
                background:
                  "conic-gradient(from 0deg, #c4a7ff, #60a5fa, #4ade80, #f4f4f5, #c4a7ff)",
              }}
            />
            <span className="hidden text-[11px] font-medium uppercase tracking-wider xl:inline">
              Theme
            </span>
          </button>
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-border bg-background px-6 pb-6 md:hidden"
          >
            {[...navItems, { name: "Connect", href: "#contact" }].map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className="block w-full border-b border-border py-4 text-left text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground last:border-0"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent("toggle-palette"));
              }}
              className="flex w-full items-center justify-between py-4 text-left text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>Color Scheme</span>
              <span
                className="h-4 w-4 rounded-full shadow-sm"
                style={{
                  background:
                    "conic-gradient(from 0deg, #c4a7ff, #60a5fa, #4ade80, #f4f4f5, #c4a7ff)",
                }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
