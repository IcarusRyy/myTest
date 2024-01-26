const path = require("path")

module.exports = function override(config, env) {
  // 修改入口文件路径
  config.entry = {
    main: path.resolve(__dirname, "src/index.tsx"),
  }

  return config
}
