import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export interface BreadcrumbsType {
  label: string;
  route?: string;
}

export default function Breadcrumb({
  breadcrumb,
}: {
  breadcrumb: BreadcrumbsType[];
}) {
  return (
    <Breadcrumbs variant="solid" size="lg">
      {breadcrumb.map((crumb) => (
        <BreadcrumbItem key={crumb.label} href={crumb.route}>
          {crumb.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
