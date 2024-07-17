/** @type {import('tailwindcss').Config} */
// import json from './public/JSON/Anim9.json';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        marck: ["Marck Script", "sans-serif"],
        shantell: ["Shantell Sans", "sans-serif"],
      },
      // backgroundImage: {
      //   'hero-pattern': `${json}`,
      //   'footer-texture': "url('/img/footer-texture.png')",
      // }
    },
  },
  plugins: [],
};
