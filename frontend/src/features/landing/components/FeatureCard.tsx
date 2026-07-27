import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <h3 className="mb-2 text-xl font-semibold">
        {title}
      </h3>

      <p className="text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}