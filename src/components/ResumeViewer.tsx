import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, ExternalLink, FileText, X } from "lucide-react";

export function ResumeViewer() {
  const [previewFailed, setPreviewFailed] = useState(false);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-card/70 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent">
          <FileText className="h-4 w-4" />View Resume
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-background outline-none sm:inset-x-1/2 sm:bottom-auto sm:top-1/2 sm:h-[92vh] sm:max-h-[920px] sm:w-[min(94vw,850px)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-5">
            <div><Dialog.Title className="font-medium text-foreground">Johanne Hesse — Resume</Dialog.Title><Dialog.Description className="mt-0.5 text-xs text-muted-foreground">Information Systems, IT support, networking, and cybersecurity</Dialog.Description></div>
            <Dialog.Close className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Close Resume viewer"><X className="h-5 w-5" /></Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-muted/40 p-3 sm:p-6">
            {previewFailed ? <div className="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center"><FileText className="h-10 w-10 text-primary" /><p className="mt-4 font-medium">Resume preview unavailable</p><p className="mt-2 text-sm text-muted-foreground">Download or open the original PDF to view the Resume.</p></div> : <img src="/assets/resume-preview.png" alt="Preview of Johanne Hesse's Resume" onError={() => setPreviewFailed(true)} className="mx-auto w-full max-w-[765px] bg-white shadow-xl ring-1 ring-black/10" />}
          </div>
          <div className="flex shrink-0 flex-col gap-2 border-t border-border bg-card p-3 min-[430px]:flex-row min-[430px]:justify-end sm:px-5">
            <a href="/assets/resume.pdf" download="Johanne-Hesse-Resume.pdf" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:brightness-110"><Download className="h-4 w-4" />Download PDF</a>
            <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm text-foreground hover:bg-accent"><ExternalLink className="h-4 w-4" />Open original PDF</a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
