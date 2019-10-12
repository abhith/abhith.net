const path = require("path");

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "../../src/components/"),
        "@types": path.resolve(__dirname, "../../src/types/")
        // '@icons': path.resolve(__dirname, '../../src/icons/'),
        // '@styles': path.resolve(__dirname, '../../src/styles/'),
        // '@utils': path.resolve(__dirname, '../../src/utils/'),
      },
      extensions: [".js", ".json", ".ts", ".tsx"]
    }
  });
};
