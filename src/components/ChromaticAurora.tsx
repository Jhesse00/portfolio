import React from "react";

export function ChromaticAurora() {
  return (
    <div
      className="chromatic-aurora fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Orb 1: Electric Cyan / Turquoise (Hero Top Left) */}
      <div
        className="aurora-orb-1 absolute -top-[12%] -left-[10%] h-[550px] w-[550px] rounded-full blur-[110px] sm:blur-[140px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 223, 216, 0.22) 0%, rgba(0, 223, 216, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Orb 2: Vibrant Neon Pink / Magenta (Hero Center-Right / Headshot) */}
      <div
        className="aurora-orb-2 absolute top-[8%] -right-[12%] h-[620px] w-[620px] rounded-full blur-[120px] sm:blur-[150px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 0, 122, 0.22) 0%, rgba(255, 0, 122, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Orb 3: Cosmic Royal Violet (Mid-page Experience / About) */}
      <div
        className="aurora-orb-3 absolute top-[40%] -left-[14%] h-[680px] w-[680px] rounded-full blur-[130px] sm:blur-[160px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(121, 40, 202, 0.25) 0%, rgba(121, 40, 202, 0.09) 45%, transparent 70%)",
        }}
      />

      {/* Orb 4: Cobalt Azure (Projects Lower Center-Right) */}
      <div
        className="aurora-orb-4 absolute top-[68%] -right-[10%] h-[640px] w-[640px] rounded-full blur-[120px] sm:blur-[150px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 112, 243, 0.22) 0%, rgba(0, 112, 243, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Orb 5: Radiant Emerald Lime (Contact / Bottom Center) */}
      <div
        className="aurora-orb-5 absolute -bottom-[12%] left-[20%] h-[540px] w-[540px] rounded-full blur-[110px] sm:blur-[140px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(74, 222, 128, 0.14) 0%, rgba(74, 222, 128, 0.04) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
