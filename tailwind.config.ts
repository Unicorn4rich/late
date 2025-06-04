import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
