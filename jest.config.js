module.exports = {
  "transform": {
    "\\.js$": [
      "esbuild-jest",
      {
        sourcemap: true
      }
    ]
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)"
  ]
}
