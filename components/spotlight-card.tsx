"use client";

import type { MouseEvent, ReactNode } from "react";

export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div onMouseMove={onMove} className={`spotlight glass rounded-3xl ${className}`}>
      {children}
    </div>
  );
}
