/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        ink: "#111827",
        muted: "#6B7280",
        brand: {
          DEFAULT: "#355E3B",
          50: "#F1F5F1",
          100: "#DCE8DD",
          600: "#355E3B",
          700: "#2A4B2F",
        },
        critical: "#DC2626",
        warning: "#F59E0B",
        success: "#16A34A",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(17, 24, 39, 0.04)",
        card: "0 1px 3px 0 rgba(17, 24, 39, 0.06), 0 1px 2px -1px rgba(17, 24, 39, 0.04)",
      },
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
      },
    },
  },
  plugins: [],
};
