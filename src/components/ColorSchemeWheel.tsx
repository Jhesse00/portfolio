import { useEffect, useRef, useState } from "react";
import { Check, Palette, RotateCcw, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const palettes = [
  { id: "purple", name: "Purple Night", colors: ["#c4a7ff", "#271936"] },
  { id: "graphite", name: "Graphite", colors: ["#f5f5f0", "#202024"] },
  { id: "ocean", name: "Ocean", colors: ["#67e8f9", "#10273c"] },
  { id: "forest", name: "Forest", colors: ["#86efac", "#132b22"] },
] as const;

type PaletteId = typeof palettes[number]["id"];
type Edge = "left" | "right";
type Position = { x: number; y: number; edge: Edge };
type DragState = { pointerId: number; startX: number; startY: number; originX: number; originY: number };

const SIZE = 56;
const MARGIN = 12;
const positionKey = "portfolio-palette-position";

function clamp(value: number, min: number, max: number) { return Math.min(max, Math.max(min, value)); }

function defaultPosition(): Position {
  return { x: Math.max(MARGIN, window.innerWidth - SIZE - MARGIN), y: Math.max(MARGIN, window.innerHeight - SIZE - MARGIN), edge: "right" };
}

function readPosition(): Position {
  const fallback = defaultPosition();
  try {
    const saved = JSON.parse(localStorage.getItem(positionKey) || "null") as { edge?: Edge; y?: number } | null;
    if (!saved || (saved.edge !== "left" && saved.edge !== "right") || typeof saved.y !== "number") return fallback;
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    return { x: saved.edge === "left" ? MARGIN : Math.max(MARGIN, window.innerWidth - SIZE - MARGIN), y: clamp(saved.y * maxY, MARGIN, maxY), edge: saved.edge };
  } catch { return fallback; }
}

export function ColorSchemeWheel() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>("purple");
  const [position, setPosition] = useState<Position | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const draggedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-palette");
    const migrated = saved === "violet" ? "purple" : saved;
    const next = palettes.some((item) => item.id === migrated) ? migrated as PaletteId : "purple";
    setPalette(next);
    document.documentElement.dataset.palette = next;
    setPosition(readPosition());
  }, []);

  useEffect(() => {
    const resize = () => setPosition(readPosition());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, [open]);

  const select = (id: PaletteId) => {
    setPalette(id);
    document.documentElement.dataset.palette = id;
    localStorage.setItem("portfolio-palette", id);
  };

  const persistPosition = (next: Position) => {
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    localStorage.setItem(positionKey, JSON.stringify({ edge: next.edge, y: clamp(next.y / maxY, 0, 1) }));
  };

  const resetPosition = () => {
    const next = defaultPosition();
    setPosition(next);
    persistPosition(next);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!position) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: position.x, originY: position.y };
    draggedRef.current = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 4) draggedRef.current = true;
    if (!draggedRef.current) return;
    const maxX = Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);
    const maxY = Math.max(MARGIN, window.innerHeight - SIZE - MARGIN);
    setPosition({ x: clamp(drag.originX + dx, MARGIN, maxX), y: clamp(drag.originY + dy, MARGIN, maxY), edge: position?.edge ?? "right" });
  };

  const onPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current || !position) return;
    dragRef.current = null;
    if (!draggedRef.current) return;
    const edge: Edge = position.x + SIZE / 2 < window.innerWidth / 2 ? "left" : "right";
    const next = { ...position, x: edge === "left" ? MARGIN : window.innerWidth - SIZE - MARGIN, edge };
    setPosition(next);
    persistPosition(next);
    window.setTimeout(() => { draggedRef.current = false; }, 0);
  };

  const toggle = () => { if (!draggedRef.current) setOpen((value) => !value); };
  const onLeft = position?.edge === "left";
  const nearTop = (position?.y ?? window.innerHeight) < 260;

  return <div ref={rootRef} className="fixed z-[60] h-14 w-14 touch-none select-none" style={position ? { left: position.x, top: position.y } : { right: MARGIN, bottom: MARGIN }}>
    {open && <div className={`absolute w-60 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl ${onLeft ? "left-0" : "right-0"} ${nearTop ? "top-16" : "bottom-16"} ${reduceMotion ? "" : "animate-in fade-in zoom-in-95 duration-150"}`} role="group" aria-label="Choose a color scheme">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div><p className="text-xs font-semibold text-foreground">Color scheme</p><p className="mt-0.5 text-[10px] text-muted-foreground">Choose a site palette</p></div>
        <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Close color scheme panel"><X className="h-4 w-4" /></button>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {palettes.map((item) => <button key={item.id} onClick={() => select(item.id)} className={`relative flex min-h-20 flex-col items-start justify-between rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${palette === item.id ? "border-primary/60 bg-primary/10" : "border-border bg-background/45 hover:border-primary/30 hover:bg-accent/60"} ${reduceMotion ? "" : "transition-colors"}`} aria-label={`Use ${item.name} color scheme`} aria-pressed={palette === item.id}>
          <span className="flex items-center"><span className="h-5 w-5 rounded-full border border-white/15 shadow-sm" style={{ backgroundColor: item.colors[0] }} /><span className="-ml-1.5 h-5 w-5 rounded-full border border-white/15 shadow-sm" style={{ backgroundColor: item.colors[1] }} /></span>
          <span className="flex w-full items-center justify-between gap-1 text-[11px] font-medium text-foreground"><span>{item.name}</span>{palette === item.id && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}</span>
        </button>)}
      </div>
      <div className="border-t border-border p-2"><button onClick={resetPosition} className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Reset palette wheel position"><RotateCcw className="h-3.5 w-3.5" />Reset position</button></div>
    </div>}
    <button onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { dragRef.current = null; }} onClick={toggle} className="absolute bottom-0 right-0 flex h-14 w-14 cursor-grab items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-xl active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label={open ? "Close color scheme panel" : "Open or drag color scheme panel"} aria-expanded={open}><Palette className="h-5 w-5" /></button>
  </div>;
}
