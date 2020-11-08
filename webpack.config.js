const path = require("path")

module.exports = {
  mode: "development",
  // mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "cky_utils.js",
    // filename: "cky_utils.min.js",
    library: "ckyUtils", // 暴露到外部使用的模块名
    libraryTarget: "umd" // 可以使用的模块方案(umd表示的是通用， cmd amd)
  },
  devServer: {
    open: true
  }
}
