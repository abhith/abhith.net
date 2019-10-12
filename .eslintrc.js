module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: `react-app`,
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
