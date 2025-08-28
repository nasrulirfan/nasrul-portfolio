"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right" | "scale-in";
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay * 1000);
        }
      },
      {
        threshold,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold, hasAnimated]);

  const animationClasses = {
    "fade-in": {
      initial: "opacity-0",
      animate: "opacity-100",
      transition: "transition-opacity ease-out",
    },
    "slide-up": {
      initial: "opacity-0 translate-y-8",
      animate: "opacity-100 translate-y-0",
      transition: "transition-all ease-out",
    },
    "slide-in-left": {
      initial: "opacity-0 -translate-x-8",
      animate: "opacity-100 translate-x-0",
      transition: "transition-all ease-out",
    },
    "slide-in-right": {
      initial: "opacity-0 translate-x-8",
      animate: "opacity-100 translate-x-0",
      transition: "transition-all ease-out",
    },
    "scale-in": {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100",
      transition: "transition-all ease-out",
    },
  };

  const { initial, animate, transition } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        initial,
        isVisible && animate,
        transition,
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}