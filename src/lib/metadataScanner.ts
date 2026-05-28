import { parseJpegExif } from "@/lib/exifParser";

export type RiskLevel = "Low" | "Medium" | "High";

export type MetadataField = {
  field: string;
  value: string;
  risk: RiskLevel;
};

export type ScanResult = {
  fileName: string;
  fileType: string;
  fileSize: string;
  sha256: string;
  riskLevel: RiskLevel;
  riskScore: number;
  metadata: MetadataField[];
  warnings: string[];
  detectedFields: string[];
  sanitizedSupported: boolean;
  note?: string;
};

const riskRank: Record<RiskLevel, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function formatHash(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createSha256(buffer: ArrayBuffer) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return formatHash(hashBuffer);
}

async function getImageDimensions(file: File) {
  const imageUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not read image dimensions."));
    });

    image.src = imageUrl;
    const loadedImage = await loaded;
    return `${loadedImage.naturalWidth} x ${loadedImage.naturalHeight}`;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function getFileType(file: File) {
  if (file.type) {
    return file.type;
  }

  return file.name.split(".").pop()?.toUpperCase() || "Unknown file type";
}

function isJpeg(file: File) {
  return file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name);
}

function isSupportedImage(file: File) {
  return ["image/jpeg", "image/png", "image/webp"].includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name);
}

function isDocumentBasicOnly(file: File) {
  return file.type === "application/pdf" || /\.(pdf|docx)$/i.test(file.name);
}

function sortByRisk(metadata: MetadataField[]) {
  return [...metadata].sort((a, b) => riskRank[b.risk] - riskRank[a.risk] || a.field.localeCompare(b.field));
}

function scoreMetadata(metadata: MetadataField[]) {
  return Math.min(
    100,
    metadata.reduce((score, item) => {
      if (item.risk === "High") return score + 35;
      if (item.risk === "Medium") return score + 15;
      return score + 3;
    }, 0),
  );
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 60) return "High";
  if (score >= 25) return "Medium";
  return "Low";
}

function buildWarnings(metadata: MetadataField[], basicOnly: boolean) {
  const fields = metadata.map((item) => item.field.toLowerCase());
  const warnings: string[] = [];

  if (fields.some((field) => field.includes("gps"))) {
    warnings.push("GPS metadata can reveal where a file or photo was created.");
  }

  if (fields.some((field) => field.includes("camera"))) {
    warnings.push("Camera make/model metadata can reveal the device used to capture an image.");
  }

  if (fields.some((field) => field.includes("date") || field.includes("time"))) {
    warnings.push("Timestamp metadata can reveal when a file was created or modified.");
  }

  if (fields.some((field) => field.includes("software"))) {
    warnings.push("Software metadata can reveal the editing or export tool used on a file.");
  }

  if (fields.some((field) => field.includes("artist") || field.includes("author") || field.includes("copyright"))) {
    warnings.push("Author-identifying metadata can expose personal or ownership details.");
  }

  if (basicOnly) {
    warnings.push("Full PDF/DOCX metadata scanning requires additional client-side libraries.");
  }

  if (!warnings.length) {
    warnings.push("Only basic file details were detected during this local browser scan.");
  }

  return warnings;
}

export async function scanFileLocally(file: File): Promise<ScanResult> {
  const buffer = await file.arrayBuffer();
  const sha256 = await createSha256(buffer);
  const metadata: MetadataField[] = [
    { field: "File Name", value: file.name, risk: "Low" },
    { field: "File Type", value: getFileType(file), risk: "Low" },
    { field: "File Size", value: formatFileSize(file.size), risk: "Low" },
    { field: "SHA-256 Hash", value: sha256, risk: "Low" },
  ];

  if (isSupportedImage(file)) {
    const dimensions = await getImageDimensions(file);
    metadata.push({ field: "Image Dimensions", value: dimensions, risk: "Low" });
  }

  if (isJpeg(file)) {
    metadata.push(...parseJpegExif(buffer));
  }

  const basicOnly = isDocumentBasicOnly(file);
  const orderedMetadata = sortByRisk(metadata);
  const riskScore = scoreMetadata(orderedMetadata);
  const riskLevel = getRiskLevel(riskScore);

  return {
    fileName: file.name,
    fileType: getFileType(file),
    fileSize: formatFileSize(file.size),
    sha256,
    riskLevel,
    riskScore,
    metadata: orderedMetadata,
    warnings: buildWarnings(orderedMetadata, basicOnly),
    detectedFields: orderedMetadata.map((item) => item.field),
    sanitizedSupported: isSupportedImage(file),
    note: basicOnly ? "Full PDF/DOCX metadata scanning requires additional client-side libraries." : undefined,
  };
}

export async function downloadSanitizedImage(file: File) {
  if (!isSupportedImage(file)) {
    throw new Error("Sanitized download is available for supported image files only in this browser demo.");
  }

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not prepare sanitized image."));
    });

    image.src = imageUrl;
    const loadedImage = await loaded;
    const canvas = document.createElement("canvas");
    canvas.width = loadedImage.naturalWidth;
    canvas.height = loadedImage.naturalHeight;
    canvas.getContext("2d")?.drawImage(loadedImage, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, file.type || "image/png", 0.92));
    if (!blob) {
      throw new Error("Could not create sanitized image.");
    }

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const extension = file.name.split(".").pop() || "png";
    link.href = downloadUrl;
    link.download = `${file.name.replace(/\.[^.]+$/, "")}-sanitized.${extension}`;
    link.click();
    URL.revokeObjectURL(downloadUrl);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
