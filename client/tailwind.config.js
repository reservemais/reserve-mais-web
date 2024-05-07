/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C5282",
        secondary: "#F6AD55",
        tertiary: "#4A5568",
        quaternary: "#ECC94B",
        quinary: "#63B3ED",
        senary: "#2D3748",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
