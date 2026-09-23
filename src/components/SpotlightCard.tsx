import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function SpotlightCard({
  children,
  className = "",
  as: Component = "div",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mouse-x", "-999px");
    cardRef.current.style.setProperty("--mouse-y", "-999px");
  };

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
}
