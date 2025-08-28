"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now() + delay * 1000;
          const endTime = startTime + duration * 1000;

          const updateCount = () => {
            const now = Date.now();
            
            if (now < startTime) {
              requestAnimationFrame(updateCount);
              return;
            }

            if (now >= endTime) {
              setCount(end);
              return;
            }

            const progress = (now - startTime) / (duration * 1000);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const currentCount = start + (end - start) * easeOutProgress;
            
            setCount(Math.floor(currentCount));
            requestAnimationFrame(updateCount);
          };

          requestAnimationFrame(updateCount);
        }
      },
      {
        threshold: 0.1,
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
  }, [start, end, duration, delay, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}