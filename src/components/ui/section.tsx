import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  background?: "default" | "muted" | "accent";
}

const backgroundVariants = {
  default: "bg-background",
  muted: "bg-muted/20",
  accent: "bg-accent/10",
};

export function Section({
  children,
  className,
  id,
  containerSize = "lg",
  background = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-8 md:py-12 lg:py-16",
        backgroundVariants[background],
        className
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}