import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.vue', './cypress/**/*.{tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin, typographyPlugin],
};
