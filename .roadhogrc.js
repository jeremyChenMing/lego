module.exports = {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        "transform-remove-console",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    }
  },
  "publicPath": "/",
  "proxy": {
    // "/api": {
      // "target": "http://localhost:3000/",
      // "changeOrigin": true,
      // "pathRewrite": { "^/api" : "" }
    // }
  },
  "hash": true,
  "theme": {
      "@primary-color": "#FFD100",
      "@font-size-base": "14px",
      "@link-color": "rgba(0, 0, 0, .65)",
  }
}
