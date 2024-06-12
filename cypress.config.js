const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Timeout of 10000 milliseconds defined due to the real requests
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  env: {
    spotifyUsername: '',
    spotifyPassword: ''
  }
});
