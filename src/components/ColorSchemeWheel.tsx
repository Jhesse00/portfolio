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
type Edge = "left" | "right";
type Position = { x: number; y: number; edge: Edge };

const SIZE = 56;
const MARGIN = 16;
const positionKey = "portfolio-palette-position";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function defaultPosition(): Position {
  if (typeof window === "undefined") return { x: 0, y: 0, edge: "right" };
  const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
  const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
  return { x: maxX, y: maxY, edge: "right" };
}

function readPosition(): Position {
  const fallback = defaultPosition();
  if (typeof window === "undefined") return fallback;
  try {
    const saved = JSON.parse(localStorage.getItem(positionKey) || "null") as { edge?: Edge; y?: number } | null;
    if (!saved || (saved.edge !== "left" && saved.edge !== "right") || typeof saved.y !== "number") return fallback;
    const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    const x = saved.edge === "left" ? MARGIN : maxX;
    const y = clamp(saved.y * maxY, MARGIN, maxY);
    return { x, y, edge: saved.edge };
  } catch {
    return fallback;
  }
}

export function ColorSchemeWheel() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>("purple");
  const [position, setPosition] = useState<Position | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number; originX: number; originY: number; moved: boolean } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-palette");
      const migrated = saved === "violet" ? "purple" : saved;
      const next = palettes.some((item) => item.id === migrated) ? (migrated as PaletteId) : "purple";
      setPalette(next);
      document.documentElement.dataset.palette = next;
    } catch {
      setPalette("purple");
      document.documentElement.dataset.palette = "purple";
    }
    setPosition(readPosition());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return defaultPosition();
        const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
        const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
        return {
          x: prev.edge === "left" ? MARGIN : maxX,
          y: clamp(prev.y, MARGIN, maxY),
          edge: prev.edge,
        };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const persistPosition = (next: Position) => {
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    try {
      localStorage.setItem(positionKey, JSON.stringify({ edge: next.edge, y: clamp(next.y / maxY, 0, 1) }));
    } catch {
      // safe fallback
    }
  };

  const resetPosition = () => {
    const next = defaultPosition();
    setPosition(next);
    persistPosition(next);
  };

  // Drag handling without breaking clicks
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!position) return;
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      originX: position.x,
      originY: position.y,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = pointerStartRef.current;
    if (!state) return;
    const dx = e.clientX - state.x;
    const dy = e.clientY - state.y;

    if (!state.moved && Math.hypot(dx, dy) > 6) {
      state.moved = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore capture errors
      }
    }

    if (state.moved) {
      const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
      const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
      setPosition({
        x: clamp(state.originX + dx, MARGIN, maxX),
        y: clamp(state.originY + dy, MARGIN, maxY),
        edge: state.originX + dx < window.innerWidth / 2 ? "left" : "right",
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = pointerStartRef.current;
    pointerStartRef.current = null;

    if (!state) return;

    if (!state.moved) {
      // Pure click - toggle panel
      setOpen((prev) => !prev);
      return;
    }

    // Was dragging - release capture and snap to edge
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    if (position) {
      const edge: Edge = position.x + SIZE / 2 < window.innerWidth / 2 ? "left" : "right";
      const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
      const next: Position = {
        ...position,
        x: edge === "left" ? MARGIN : maxX,
        edge,
      };
      setPosition(next);
      persistPosition(next);
    }
  };

  const onLeft = position?.edge === "left";
  const nearTop = (position?.y ?? 800) < 320;

  return (
    <div
      ref={rootRef}
      className="fixed z-[60] h-14 w-14 select-none touch-none"
      style={position ? { left: position.x, top: position.y } : { right: MARGIN, bottom: MARGIN }}
    >
      {/* Sleek Palette Modal */}
      {open && (
        <div
          role="dialog"
          aria-label="Color Palette Switcher"
          className={`card-sheen absolute w-72 overflow-hidden rounded-2xl border border-border/90 bg-card/95 p-4 shadow-2xl backdrop-blur-2xl ${
            onLeft ? "left-0" : "right-0"
          } ${nearTop ? "top-16" : "bottom-16"} ${
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

          {/* Footer Reset */}
          <div className="mt-3 flex items-center justify-between border-t border-border/80 pt-2.5">
            <button
              onClick={() => selectPalette("purple")}
              className="text-[10px] font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Reset to Purple
            </button>
            <button
              onClick={resetPosition}
              className="btn-tactile flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Reset color button position to bottom right"
            >
              <RotateCcw className="h-3 w-3" />
              Reset position
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStartRef.current = null;
        }}
        className={`card-sheen absolute bottom-0 right-0 flex h-14 w-14 cursor-grab items-center justify-center rounded-full border border-white/20 bg-primary text-primary-foreground shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.6)] ring-1 ring-white/20 transition-all duration-200 active:cursor-grabbing active:scale-95 hover:shadow-[0_12px_40px_-2px_hsl(var(--primary)/0.8)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          open ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : ""
        }`}
        aria-label={open ? "Close color palette picker" : "Open color palette picker"}
        aria-expanded={open}
      >
        <Palette className="h-5 w-5 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}
