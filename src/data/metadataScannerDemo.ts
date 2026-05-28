export type ScanStep = {
  label: string;
  description: string;
};

export const scanSteps: ScanStep[] = [
  {
    label: "Loading file locally",
    description: "Reading the selected file in your browser without uploading it.",
  },
  {
    label: "Reading metadata",
    description: "Checking file details, image dimensions, hashes, and JPEG EXIF fields.",
  },
  {
    label: "Checking privacy risks",
    description: "Flagging sensitive fields that could reveal identity, device, or location details.",
  },
  {
    label: "Preparing sanitized version",
    description: "Preparing a browser-generated sanitized image when supported.",
  },
];
