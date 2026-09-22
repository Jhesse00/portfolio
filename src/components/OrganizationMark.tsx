import { useState } from "react";
import { cn } from "@/lib/utils";
import { organizations } from "@/data/organizations";
import type { OrganizationId } from "@/data/organizations";

export function OrganizationMark({ organization, className }: { organization: OrganizationId; className?: string }) {
  const [failed, setFailed] = useState(false);
  const item = organizations[organization];

  return (
    <span className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 shadow-sm", item.tileClassName, className)}>
      {failed ? (
        <span className="px-1 text-center text-[8px] font-black uppercase leading-none text-black/70">{item.name}</span>
      ) : (
        <img src={item.logo} alt={`${item.name} logo`} className={cn("object-contain", item.imageClassName)} onError={() => setFailed(true)} />
      )}
    </span>
  );
}
