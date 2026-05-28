import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/metadataScanner";

const riskStyles: Record<RiskLevel, string> = {
  Low: "border-primary/20 bg-primary/10 text-primary",
  Medium: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  High: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-sm font-medium", riskStyles[level])}>
      {level} Risk
    </span>
  );
}
