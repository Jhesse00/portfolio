import { CheckCircle2, Loader2 } from "lucide-react";

import type { ScanStep } from "@/data/metadataScannerDemo";

export function ScanProgress({ steps, currentStep, isComplete }: { steps: ScanStep[]; currentStep: number; isComplete: boolean }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm md:p-6">
      <h2 className="text-xl font-semibold">Scan Progress</h2>
      <div className="mt-5 space-y-4">
        {steps.map((step, index) => {
          const complete = isComplete || index < currentStep;
          const active = !isComplete && index === currentStep;

          return (
            <div key={step.label} className="flex gap-3">
              <div className="mt-0.5">
                {complete ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : active ? (
                  <Loader2 className="h-5 w-5 text-primary motion-safe:animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-border" />
                )}
              </div>
              <div>
                <p className="font-medium">{step.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
