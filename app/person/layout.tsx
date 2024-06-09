import React, { ReactNode } from "react";
import PersonLayoutComponent from "./PersonLayoutComponent";

export default function PersonLayout({ children }: { children: ReactNode }) {
  return <PersonLayoutComponent>{children}</PersonLayoutComponent>;
}
