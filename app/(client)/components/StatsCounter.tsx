"use client";

import React, { useEffect, useRef } from "react";

interface StatsCounterProps {
  value: string;
  duration?: number;
}

const StatsCounter = ({ value, duration = 2000 }: StatsCounterProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const match = value.match(/^\D*(\d+)\D*$/);
    if (!match || !ref.current) return;

    const target = Number(match[1]);
    const suffix = value.replace(/\d+/, "");
    const start = performance.now();

    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (ref.current) {
        ref.current.textContent = `${current}${suffix}`;
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
};

export default StatsCounter;