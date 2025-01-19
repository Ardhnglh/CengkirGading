/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dramatic-header": ["Playfair Display", "serif"],
        "natural-body": ["Lora", "serif"],
        "dramatic-body": ["Merriweather", "serif"],
        "dramatic-body-user": ["Crimson Text", "serif"],
        "dramatic-header-user": ["Cormorant Garamond", "serif"],
        "dramatic-subtitle": ["Lora", "serif"],
        "event-header": ["Libre Baskerville", "serif"],
        "event-body": ["Lora", "serif"],
        "event-subtext": ["Roboto", "sans-serif"],
        "sidebar-heading": ["Poppins", "sans-serif"],
        "sidebar-menu": ["Roboto", "sans-serif"],
        "sidebar-submenu": ["Open Sans", "sans-serif"],
        "sidebar-menu-admin": ["Work Sans", "sans-serif"],
        "footer-body": ["Open Sans", "sans-serif"],
        "footer-heading": ["Georgia", "serif"],
      },
      colors: {
        "custom-gray": "#1A1A1A",
      },
    },
  },
  plugins: [],
};
