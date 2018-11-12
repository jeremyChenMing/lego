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
    "/api/": {
      "target": "https://www.51bricks.com/api/",
      // "target": "http://api.d.51bricks.com/api/",
      // "target": "http://bricks.upvi.com/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/" : "" }
    },
    "/public/": {
      "target": "https://www.51bricks.com/",
      // "target": "http://api.d.51bricks.com/",
      // "target": "http://bricks.upvi.com/",
      "changeOrigin": true,
      // "pathRewrite": { "^/public/" : "" }
    },
  },
  "hash": true,
  "theme": {
      "@primary-color": "#FFD100",
      "@font-size-base": "14px",
      "@link-color": "rgba(0, 0, 0, .65)",
  }
}
