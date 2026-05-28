import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, FileSearch } from "lucide-react";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FileSummaryCard } from "@/components/metadata-scanner/FileSummaryCard";
import { FileUploadBox } from "@/components/metadata-scanner/FileUploadBox";
import { MetadataTable } from "@/components/metadata-scanner/MetadataTable";
import { PrivacyWarnings } from "@/components/metadata-scanner/PrivacyWarnings";
import { ScanProgress } from "@/components/metadata-scanner/ScanProgress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { scanSteps } from "@/data/metadataScannerDemo";
import { downloadSanitizedImage, scanFileLocally } from "@/lib/metadataScanner";
import type { ScanResult } from "@/lib/metadataScanner";

type ScanStatus = "idle" | "scanning" | "complete" | "error";

const minimumScanDuration = scanSteps.length * 700;

function wait(duration: number) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

export function MetadataScannerDemo() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const scanRequestId = useRef(0);
  const { toast } = useToast();

  useEffect(() => {
    if (status !== "scanning") {
      return;
    }

    if (currentStep >= scanSteps.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCurrentStep((step) => step + 1);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [currentStep, status]);

  async function handleFileSelect(file: File) {
    const requestId = scanRequestId.current + 1;
    scanRequestId.current = requestId;

    setSelectedFile(file);
    setCurrentStep(0);
    setScanResult(undefined);
    setErrorMessage(undefined);
    setStatus("scanning");

    try {
      const [result] = await Promise.all([scanFileLocally(file), wait(minimumScanDuration)]);

      if (scanRequestId.current !== requestId) {
        return;
      }

      setCurrentStep(scanSteps.length);
      setScanResult(result);
      setStatus("complete");
    } catch (error) {
      if (scanRequestId.current !== requestId) {
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : "Unable to scan this file in the browser.");
      setStatus("error");
    }
  }

  async function handleSanitizedDownload() {
    if (!selectedFile || !scanResult?.sanitizedSupported) {
      toast({
        title: "Not available for this file",
        description: "Sanitized image download is supported for JPEG, PNG, and WebP files in this browser demo.",
      });
      return;
    }

    try {
      await downloadSanitizedImage(selectedFile);
      toast({
        title: "Sanitized image prepared",
        description: "The browser re-encoded the image to remove embedded metadata where supported.",
      });
    } catch (error) {
      toast({
        title: "Sanitized download failed",
        description: error instanceof Error ? error.message : "Could not prepare a sanitized download.",
      });
    }
  }

  const showResults = status === "complete" && !!scanResult;
  const detectedFields = scanResult?.detectedFields ?? ["Select a file to begin"];

  return (
    <main className="pt-16">
      <section className="bg-gradient-to-b from-background to-accent/20 py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <ScrollReveal className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border bg-card shadow-sm">
              <FileSearch className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <p className="mx-auto inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Files are scanned locally in your browser and are not uploaded.
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Metadata Privacy Scanner Demo
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Select a file to inspect real file details, hashes, image dimensions, and basic JPEG EXIF metadata without a backend.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Demo mode: PDF and DOCX files use basic file analysis only until full client-side parsers are added.
              </p>
            </div>
            <Button asChild variant="outline">
              <a href="/#projects" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <ScrollReveal>
              <FileUploadBox fileName={selectedFile?.name} onFileSelect={handleFileSelect} />
            </ScrollReveal>

            {status !== "idle" && (
              <ScrollReveal>
                <ScanProgress steps={scanSteps} currentStep={currentStep} isComplete={showResults} />
              </ScrollReveal>
            )}

            {status === "error" && errorMessage && (
              <ScrollReveal>
                <div className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-red-700 shadow-sm dark:text-red-300">
                  <AlertCircle className="mt-0.5 h-5 w-5" />
                  <div>
                    <h2 className="font-semibold">Scan failed</h2>
                    <p className="mt-1 text-sm">{errorMessage}</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {showResults && scanResult && (
              <ScrollReveal>
                <MetadataTable metadata={scanResult.metadata} />
              </ScrollReveal>
            )}
          </div>

          <aside className="space-y-6">
            <ScrollReveal delay={0.08}>
              <FileSummaryCard result={scanResult} />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-lg border bg-card p-5 shadow-sm md:p-6">
                <h2 className="text-xl font-semibold">Detected Fields</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {detectedFields.map((field) => (
                    <span key={field} className="rounded-full bg-accent/60 px-2.5 py-1 text-xs text-accent-foreground">
                      {field}
                    </span>
                  ))}
                </div>
                <Button className="mt-5 w-full" disabled={!showResults} onClick={handleSanitizedDownload}>
                  {scanResult?.sanitizedSupported ? "Download Sanitized Image" : "Sanitized Download"}
                </Button>
                {showResults && scanResult && !scanResult.sanitizedSupported && (
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Sanitized download is available for supported image files in this browser demo.
                  </p>
                )}
              </div>
            </ScrollReveal>

            {showResults && scanResult && (
              <ScrollReveal delay={0.12}>
                <PrivacyWarnings warnings={scanResult.warnings} />
              </ScrollReveal>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
