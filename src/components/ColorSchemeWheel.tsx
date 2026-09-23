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

interface PositionState {
  edge: Edge;
  y: number;
  isDragging?: boolean;
  dragX?: number;
  dragY?: number;
}

const SIZE = 56;
const MARGIN = 16;
const positionKey = "portfolio-palette-position-v2";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getDefaultPosition(): PositionState {
  if (typeof window === "undefined") return { edge: "right", y: 700 };
  const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
  return { edge: "right", y: maxY };
}

function loadSavedPosition(): PositionState {
  const fallback = getDefaultPosition();
  if (typeof window === "undefined") return fallback;
  try {
    const saved = JSON.parse(localStorage.getItem(positionKey) || "null") as { edge?: Edge; yRatio?: number } | null;
    if (!saved || (saved.edge !== "left" && saved.edge !== "right") || typeof saved.yRatio !== "number") {
      return fallback;
    }
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    const y = clamp(saved.yRatio * maxY, MARGIN, maxY);
    return { edge: saved.edge, y };
  } catch {
    return fallback;
  }
}

export function ColorSchemeWheel() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>("purple");
  const [position, setPosition] = useState<PositionState>(loadSavedPosition);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    isDrag: boolean;
  } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-palette");
      const next = palettes.some((item) => item.id === saved) ? (saved as PaletteId) : "purple";
      setPalette(next);
      document.documentElement.dataset.palette = next;
    } catch {
      setPalette("purple");
      document.documentElement.dataset.palette = "purple";
    }
    setPosition(loadSavedPosition());
  }, []);

  // Handle window resizing safely
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
        return {
          ...prev,
          y: clamp(prev.y, MARGIN, maxY),
        };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const persistPosition = (next: PositionState) => {
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    try {
      localStorage.setItem(
        positionKey,
        JSON.stringify({ edge: next.edge, yRatio: clamp(next.y / maxY, 0, 1) })
      );
    } catch {
      // safe fallback
    }
  };

  const resetPosition = () => {
    const def = getDefaultPosition();
    setPosition(def);
    persistPosition(def);
  };

  // Drag handling that never swallows clicks
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: rect.left,
      originY: rect.top,
      isDrag: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const start = pointerStartRef.current;
    if (!start) return;

    const dx = e.clientX - start.startX;
    const dy = e.clientY - start.startY;

    if (!start.isDrag && Math.hypot(dx, dy) > 6) {
      start.isDrag = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    if (start.isDrag) {
      const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
      const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
      const currentX = clamp(start.originX + dx, MARGIN, maxX);
      const currentY = clamp(start.originY + dy, MARGIN, maxY);

      setPosition((prev) => ({
        ...prev,
        isDragging: true,
        dragX: currentX,
        dragY: currentY,
      }));
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;

    if (!start) return;

    if (!start.isDrag) {
      // Direct click - toggle open/close cleanly!
      setOpen((prev) => !prev);
      return;
    }

    // Was dragging - release pointer capture & snap to closest edge
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    const currentX = position.dragX ?? start.originX;
    const currentY = position.dragY ?? start.originY;
    const edge: Edge = currentX + SIZE / 2 < window.innerWidth / 2 ? "left" : "right";
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    const finalY = clamp(currentY, MARGIN, maxY);

    const nextPos: PositionState = {
      edge,
      y: finalY,
      isDragging: false,
      dragX: undefined,
      dragY: undefined,
    };

    setPosition(nextPos);
    persistPosition(nextPos);
  };

  const onLeft = position.edge === "left";
  const nearTop = position.y < 340;

  // Compute container style
  const containerStyle: React.CSSProperties = position.isDragging
    ? {
        left: position.dragX,
        top: position.dragY,
      }
    : onLeft
    ? {
        left: MARGIN,
        top: position.y,
      }
    : {
        right: MARGIN,
        top: position.y,
      };

  return (
    <div
      ref={rootRef}
      className="fixed z-[60] h-14 w-14 select-none touch-none"
      style={containerStyle}
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

          {/* Footer Controls */}
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
              aria-label="Reset color wheel position"
            >
              <RotateCcw className="h-3 w-3" />
              Reset position
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Literal Color Wheel Ring */}
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStartRef.current = null;
        }}
        className={`group relative flex h-14 w-14 cursor-grab items-center justify-center rounded-full p-[2px] transition-all duration-300 active:cursor-grabbing active:scale-95 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          open ? "scale-105" : ""
        }`}
        aria-label={open ? "Close color palette picker" : "Open color palette picker"}
        aria-expanded={open}
      >
        {/* Literal Radiant Color Wheel Conic Gradient Ring */}
        <span
          className="absolute inset-0 rounded-full animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              "conic-gradient(from 0deg, #c4a7ff 0deg, #60a5fa 90deg, #4ade80 180deg, #f4f4f5 270deg, #c4a7ff 360deg)",
            filter: "blur(0.5px)",
          }}
        />

        {/* Outer ambient glow */}
        <span
          className="absolute -inset-1 rounded-full opacity-40 group-hover:opacity-80 transition-opacity blur-md"
          style={{
            background:
              "conic-gradient(from 0deg, #c4a7ff, #60a5fa, #4ade80, #f4f4f5, #c4a7ff)",
          }}
        />

        {/* Inner button surface */}
        <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-card/90 backdrop-blur-md border border-white/20 text-foreground transition-all duration-200 group-hover:bg-card">
          <Palette className="h-5 w-5 text-foreground transition-transform group-hover:rotate-45" />
        </span>
      </button>
    </div>
  );
}
