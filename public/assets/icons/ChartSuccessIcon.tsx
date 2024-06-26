import React from "react";
import { IconSvgProps } from "@/types/icon";

export const ChartSuccessIcon = ({
  size = 24,
  width,
  height,
  color = "#292D32",
  ...props
}: IconSvgProps) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 13V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 13V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 13V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 19.43L17.58 21L21 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10.5V13.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 10.5V13.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 10.5V13.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
