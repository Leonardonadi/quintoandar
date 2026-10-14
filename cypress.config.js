const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.quintoandar.com.br',
    supportFile: false,
  },
})
