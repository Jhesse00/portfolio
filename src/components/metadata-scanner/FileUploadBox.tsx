import { Upload } from "lucide-react";
import type { ChangeEvent } from "react";

export function FileUploadBox({ fileName, onFileSelect }: { fileName?: string; onFileSelect: (file: File) => void }) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }

  return (
    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-primary/25 bg-card p-8 text-center shadow-sm transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-md motion-safe:hover:-translate-y-1">
      <Upload className="mb-4 h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-105" />
      <span className="text-lg font-semibold">Select a file to scan</span>
      <span className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        Choose a JPEG, PNG, WebP, PDF, or DOCX file. Files are scanned locally in your browser and are not uploaded.
      </span>
      {fileName && (
        <span className="mt-4 max-w-full rounded-full bg-accent/60 px-3 py-1 text-sm text-accent-foreground">
          Selected: {fileName}
        </span>
      )}
      <input className="sr-only" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.docx" onChange={handleChange} />
    </label>
  );
}
