"use client";

import type { ReactNode } from "react";
import { openChat } from "./open-chat";

export function AskButton({
  question,
  className = "",
  children,
}: {
  question?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={() => openChat(question)} className={className}>
      {children}
    </button>
  );
}
