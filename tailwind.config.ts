import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(24,25,26)",
        },
        secondary: {
          DEFAULT: "rgb(36,37,38)",
        },
        third: {
          DEFAULT: "rgb(58,59,60)",
          "20": "rgba(58,59,60,0.20)",
          "50": "rgba(58,59,60,0.50)",
          "75": "rgba(58,59,60,0.75)",
        },
        gray: {
          DEFAULT: "rgb(176,179,184)",
        },
        red: {
          DEFAULT: "rgb(240,40,73)",
        },
        green: {
          DEFAULT: "rgb(69,189,98)",
        },
        yellow: {
          DEFAULT: "rgb(247,185,40)",
        },
        blue: {
          DEFAULT: "rgb(20,124,254)",
        },
        danger: {
          DEFAULT: "rgb(240,40,73)",
        },
        success: {
          DEFAULT: "rgb(69,189,98)",
        },
        warning: {
          DEFAULT: "rgb(247,185,40)",
        },
        info: {
          DEFAULT: "rgb(20,124,254)",
        }
      }
    },
  },
  plugins: [nextui()],
}
export default config
