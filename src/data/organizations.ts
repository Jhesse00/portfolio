export type OrganizationId = "autozone" | "uhaul" | "nyu";

export interface Organization {
  name: string;
  logo: string;
  tileClassName: string;
  imageClassName: string;
}

export const organizations: Record<OrganizationId, Organization> = {
  autozone: {
    name: "AutoZone",
    logo: "/assets/logos/autozone.svg",
    tileClassName: "bg-white",
    imageClassName: "h-7 w-7",
  },
  uhaul: {
    name: "U-Haul",
    logo: "/assets/logos/uhaul.svg",
    tileClassName: "bg-white",
    imageClassName: "h-5 w-8",
  },
  nyu: {
    name: "New York University",
    logo: "/assets/logos/nyu.svg",
    tileClassName: "bg-white",
    imageClassName: "h-8 w-8",
  },
};
