import { useEffect, useRef, useState } from "react";
import { Check, Palette, RotateCcw, X, Sparkles } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const palettes = [
  {
    id: "purple",
    name: "Purple Night",
    subtitle: "Signature Amethyst",
    accent: "#c4a7ff",
    bg: "#160e22",
  },
  {
    id: "graphite",
    name: "Studio Titanium",
    subtitle: "Carbon Monochrome",
    accent: "#f4f4f5",
    bg: "#0f0f12",
  },
  {
    id: "ocean",
    name: "Sapphire Ocean",
    subtitle: "Deep Azure",
    accent: "#60a5fa",
    bg: "#091224",
  },
  {
    id: "forest",
    name: "Emerald Forest",
    subtitle: "Alpine Sage",
    accent: "#4ade80",
    bg: "#091811",
  },
] as const;

type PaletteId = typeof palettes[number]["id"];

export function ColorSchemeWheel() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>("purple");
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Load palette from localStorage on mount
  useEffect(() => {
    try {
      // Clear any legacy broken position keys
      localStorage.removeItem("portfolio-palette-position");
      localStorage.removeItem("portfolio-palette-position-v2");

      const saved = localStorage.getItem("portfolio-palette");
      const next = palettes.some((item) => item.id === saved) ? (saved as PaletteId) : "purple";
      setPalette(next);
      document.documentElement.dataset.palette = next;
    } catch {
      setPalette("purple");
      document.documentElement.dataset.palette = "purple";
    }

    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-palette", handleToggle);
    return () => window.removeEventListener("toggle-palette", handleToggle);
  }, []);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEsc);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [open]);

  const selectPalette = (id: PaletteId) => {
    setPalette(id);
    document.documentElement.dataset.palette = id;
    try {
      localStorage.setItem("portfolio-palette", id);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6 select-none"
    >
      {/* Sleek Palette Modal */}
      {open && (
        <div
          role="dialog"
          aria-label="Color Palette Switcher"
          className={`card-sheen absolute bottom-16 right-0 z-50 w-72 overflow-hidden rounded-2xl border border-border/90 bg-card/95 p-4 shadow-2xl backdrop-blur-2xl ${
            reduceMotion ? "" : "animate-in fade-in zoom-in-95 duration-150"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Color Palette
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Refined luxury theme presets
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close color palette panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Palette List */}
          <div className="mt-3 space-y-2">
            {palettes.map((item) => {
              const isSelected = palette === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => selectPalette(item.id)}
                  className={`card-sheen group relative flex w-full items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isSelected
                      ? "border-primary/60 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/.15)]"
                      : "border-border/70 bg-background/40 hover:border-primary/40 hover:bg-secondary/60"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Select ${item.name} palette`}
                >
                  <div className="flex items-center gap-3">
                    {/* Swatch Pill */}
                    <div
                      className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 shadow-inner"
                      style={{ backgroundColor: item.bg }}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shadow-sm ring-1 ring-white/20"
                        style={{ backgroundColor: item.accent }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {item.name}
                        {item.id === "purple" && (
                          <span className="ml-1.5 rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="mt-3 flex items-center justify-between border-t border-border/80 pt-2.5">
            <button
              onClick={() => selectPalette("purple")}
              className="text-[10px] font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Reset to Purple
            </button>
            <span className="text-[10px] text-muted-foreground/60">
              Auto-saved
            </span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Literal Radiant Color Wheel Conic Ring */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-[2px] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          open ? "scale-105" : ""
        }`}
        aria-label={open ? "Close color palette picker" : "Open color palette picker"}
        aria-expanded={open}
      >
        {/* Literal Radiant Color Wheel Conic Gradient Ring */}
        <span
          className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-90 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from 0deg, #c4a7ff 0deg, #60a5fa 90deg, #4ade80 180deg, #f4f4f5 270deg, #c4a7ff 360deg)",
          }}
        />

        {/* Outer ambient glow */}
        <span
          className="absolute -inset-1 rounded-full opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-90"
          style={{
            background:
              "conic-gradient(from 0deg, #c4a7ff 0deg, #60a5fa 90deg, #4ade80 180deg, #f4f4f5 270deg, #c4a7ff 360deg)",
          }}
        />

        {/* Inner button surface */}
        <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-card/90 backdrop-blur-md border border-white/20 text-foreground transition-all duration-200 group-hover:bg-card">
          <Palette className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </button>
    </div>
  );
}
