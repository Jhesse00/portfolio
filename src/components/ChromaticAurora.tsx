import React from "react";

export function ChromaticAurora() {
  return (
    <div
      className="chromatic-aurora fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 
        High-Performance Hardware-Composited Chromatic Mesh:
        Uses native anti-aliased CSS radial gradients without expensive gaussian blur filters.
        Delivers silky 60/120fps performance on all mobile devices and laptops.
      */}
      <div
        className="aurora-mesh absolute -inset-[15%] opacity-90 will-change-transform"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 15%, rgba(0, 223, 216, 0.22) 0%, rgba(0, 223, 216, 0.05) 35%, transparent 55%),
            radial-gradient(circle at 82% 20%, rgba(255, 0, 122, 0.22) 0%, rgba(255, 0, 122, 0.05) 38%, transparent 58%),
            radial-gradient(circle at 15% 55%, rgba(121, 40, 202, 0.24) 0%, rgba(121, 40, 202, 0.06) 40%, transparent 60%),
            radial-gradient(circle at 85% 72%, rgba(0, 112, 243, 0.22) 0%, rgba(0, 112, 243, 0.05) 36%, transparent 56%),
            radial-gradient(circle at 45% 92%, rgba(74, 222, 128, 0.14) 0%, rgba(74, 222, 128, 0.03) 30%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
