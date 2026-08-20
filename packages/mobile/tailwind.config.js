/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        display: ["Baloo2_400Regular"],
        "display-bold": ["Baloo2_700Bold"],
        "display-extrabold": ["Baloo2_800ExtraBold"],
        cta: ["ArchivoBlack_400Regular"],
        mono: ["JetBrainsMono_400Regular"],
        "mono-bold": ["JetBrainsMono_700Bold"],
      },
    },
  },
  plugins: [],
};
