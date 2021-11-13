const typography = require('windicss/plugin/typography');

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [typography],
  shortcuts: {
    btn: 'p-2 h-min w-m font-medium text-xl rounded-lg shadow-md',
    'btn-gray': 'text-black bg-gray-300 hover:bg-purple-700 hover:text-white',
  },
};