import type { ReactNode } from "react";

interface DetailsRowProps {
  label: string;
  value: ReactNode;
}

export default function DetailsRow({
  label,
  value,
}: DetailsRowProps) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4">
      <span className="text-sm font-medium text-muted-foreground">
        {label}
      </span>

      <span className="text-sm">
        {value || "—"}
      </span>
    </div>
  );
}