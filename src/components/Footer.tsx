export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="section-shell flex flex-col gap-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-foreground">Johanne Hesse</p>
          <p className="mt-1">IT support, systems &amp; cybersecurity</p>
        </div>
        <p className="text-xs text-muted-foreground/80">© {new Date().getFullYear()} Johanne Hesse. All rights reserved.</p>
      </div>
    </footer>
  );
}
