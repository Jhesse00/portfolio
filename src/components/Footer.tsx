export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/80 bg-background/60 backdrop-blur-md pt-10 pb-28 sm:pb-24">
      <div className="section-shell flex flex-col gap-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:pl-28 sm:pr-24">
        <div>
          <p className="font-medium text-foreground">Johanne Hesse</p>
          <p className="mt-1 text-xs text-muted-foreground">IT support, systems &amp; cybersecurity</p>
        </div>
        <p className="text-xs text-muted-foreground/75">
          © {new Date().getFullYear()} Johanne Hesse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
