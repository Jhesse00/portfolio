import { TelemetryBar } from "@/components/TelemetryBar";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="section-shell flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">Johanne Hesse</p>
          <p className="mt-1">IT support, systems &amp; cybersecurity</p>
        </div>

        {/* Center telemetry status bar */}
        <div className="flex items-center">
          <TelemetryBar />
        </div>

        <p className="text-xs text-muted-foreground/80">© {new Date().getFullYear()} Johanne Hesse. All rights reserved.</p>
      </div>
    </footer>
  );
}
