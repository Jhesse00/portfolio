import { AlertTriangle } from "lucide-react";

export function PrivacyWarnings({ warnings }: { warnings: string[] }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm md:p-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Privacy Warnings</h2>
      </div>
      <ul className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
        {warnings.map((warning) => (
          <li key={warning} className="rounded-md bg-accent/50 p-3">
            {warning}
          </li>
        ))}
      </ul>
    </div>
  );
}
