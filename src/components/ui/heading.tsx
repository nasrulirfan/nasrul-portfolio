import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const sizeClasses = {
  xs: "text-xs font-medium",
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-lg font-semibold",
  xl: "text-xl md:text-2xl font-semibold",
  "2xl": "text-2xl md:text-3xl lg:text-4xl font-semibold",
  "3xl": "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter",
};

export function Heading({
  children,
  level = 2,
  size,
  className,
  as,
}: HeadingProps) {
  const Component = as || (`h${level}` as const);
  
  // Default size based on level if not specified
  const defaultSize = {
    1: "3xl",
    2: "2xl", 
    3: "xl",
    4: "lg",
    5: "md",
    6: "sm",
  }[level] as keyof typeof sizeClasses;

  const finalSize = size || defaultSize;

  return (
    <Component
      className={cn(
        "text-foreground text-balance leading-tight",
        sizeClasses[finalSize],
        className
      )}
    >
      {children}
    </Component>
  );
}