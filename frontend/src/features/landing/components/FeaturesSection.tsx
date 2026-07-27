import Container from "@/shared/components/Container";

import FeatureCard from "./FeatureCard";
import { features } from "../data/features";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-20"
    >
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Why Choose SmartConnect?
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Everything your school needs to improve communication,
            attendance, meetings, student safety, and academic
            performance—all in one platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}