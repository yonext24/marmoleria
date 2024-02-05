import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        white: "#F5F5FA",
        black: "#0C1618",
        blue: "#48ACF0",
        gold: "#F5C800"
      },
      animation: {
        appear: "appear .14s ease-in",
        line: "line 1s ease-in-out",
        loader: "loader 2s linear infinite",
        "skeleton-right": "skeletonRight 1.5s ease infinite"
      },
      keyframes: {
        appear: { from: { opacity: "0" }, to: { opacity: "1" } },
        skeletonRight: {
          to: { backgroundPosition: "right -200px top 0" }
        },
        line: {
          from: {
            backgroundPosition: "0 0"
          },
          to: {
            backgroundPosition: "100% 0"
          }
        },
        loader: {
          "0%, 10%": {
            transform: "translate(-64px, -64px) rotate(-45deg)"
          },
          "90%, 100%": {
            transform: "translate(0px, 0px) rotate(-45deg)"
          }
        }
      }
    }
  },
  plugins: []
}
export default config
