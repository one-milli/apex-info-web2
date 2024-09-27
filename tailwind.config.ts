import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "slide-right":
          "slide-right 1s cubic-bezier(0.215, 0.610, 0.355, 1.000)  infinite alternate ",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(5px)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
