import type { NextUIPluginConfig } from "@nextui-org/react";

export const themeConfig: Partial<NextUIPluginConfig> = {
  themes: {
    light: {
      layout: {
        radius: {
          small: "0.25rem",
          medium: "0.5rem",
          large: "0.75rem",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#11181C",
        primary: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
      },
    },
    dark: {
      layout: {
        radius: {
          small: "0.25rem",
          medium: "0.5rem",
          large: "0.75rem",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      colors: {
        background: "#0F172A",
        foreground: "#ECEDEE",
        primary: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
      },
    },
  },
}; 