import { FileText, ShieldCheck } from "lucide-react";

import { RiskBadge } from "@/components/metadata-scanner/RiskBadge";
import type { ScanResult } from "@/lib/metadataScanner";

export function FileSummaryCard({ result }: { result?: ScanResult }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm md:p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Scan Summary</h2>
      </div>

      {!result ? (
        <div className="mt-5 rounded-md bg-accent/50 p-4 text-sm text-gray-500 dark:text-gray-400">
          Select a file to see real local scan details.
        </div>
      ) : (
        <div className="mt-5 space-y-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500 dark:text-gray-400">Risk level</span>
            <RiskBadge level={result.riskLevel} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500 dark:text-gray-400">Risk score</span>
            <span className="font-medium">{result.riskScore}/100</span>
          </div>
          <div className="rounded-md bg-accent/50 p-3">
            <div className="mb-2 flex items-center gap-2 font-medium">
              <FileText className="h-4 w-4" />
              {result.fileName}
            </div>
            <div className="space-y-2 text-gray-500 dark:text-gray-400">
              <p>Type: {result.fileType}</p>
              <p>Size: {result.fileSize}</p>
              <p className="break-all">SHA-256: {result.sha256}</p>
            </div>
          </div>
          {result.note && (
            <p className="rounded-md border border-primary/15 bg-primary/10 p-3 text-primary">
              {result.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
