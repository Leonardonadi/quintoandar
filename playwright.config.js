const { defineConfig, devices } = require('@playwright/test')
const { defineBddConfig } = require('playwright-bdd')

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.js',
  outputDir: '.features-gen',
  language: 'pt',
})

module.exports = defineConfig({
  testDir,
  fullyParallel: true,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://www.quintoandar.com.br',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
