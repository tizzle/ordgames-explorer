import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
        secondary: colors.slate,
      },
      fontSize: {
        "3xs": ["0.5rem", "0.75rem"],
        "2xs": ["0.75rem", "0.875rem"],
      },
    },
  },
  plugins: [forms, typography],
};
