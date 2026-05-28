import { RiskBadge } from "@/components/metadata-scanner/RiskBadge";
import type { MetadataField } from "@/lib/metadataScanner";

export function MetadataTable({ metadata }: { metadata: MetadataField[] }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="text-xl font-semibold">Detected Metadata</h2>
      </div>
      {!metadata.length && (
        <div className="px-5 py-6 text-sm text-gray-500 dark:text-gray-400">
          No metadata fields were detected yet. Select a file to scan locally.
        </div>
      )}
      {!!metadata.length && <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-accent/50 text-accent-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Field</th>
              <th className="px-5 py-3 font-medium">Value</th>
              <th className="px-5 py-3 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {metadata.map((item) => (
              <tr key={item.field} className="border-t">
                <td className="px-5 py-3 font-medium">{item.field}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{item.value}</td>
                <td className="px-5 py-3">
                  <RiskBadge level={item.risk} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}
