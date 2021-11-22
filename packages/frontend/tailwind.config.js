const extendZIndex = (number) => {
  const extension = {};
  for (let i = 0; i < number; i++) {
    extension[i.toString()] = i;
  }
  return extension;
};

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: extendZIndex(70),
      colors: {
        rinkeby: '#FFD162',
        polygon: '#8247E5'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
