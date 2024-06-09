import React, { ReactNode } from "react";

export default function PersonLayoutComponent({ children }: { children: ReactNode }) {
  return <div className="w-full min-h-screen p-8 bg-gray-200">{children}</div>;
}
