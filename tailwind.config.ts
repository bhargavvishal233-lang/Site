import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAF6F5",
          subtle: "#FDFBFB",
        },
        crimson: {
          DEFAULT: "#D3101B",
          hover: "#B80D17",
          light: "rgba(211, 16, 27, 0.08)",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          muted: "#666666",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      boxShadow: {
        subtle: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
