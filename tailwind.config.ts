import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jp: ["'Noto Sans JP'", "'Hiragino Kaku Gothic ProN'", "Meiryo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
