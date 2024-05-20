/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  requestTimeout: 20000,

  retries: {
    runMode: 0,
    openMode: 0,
  },

  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve("typescript"),
      };

      on("file:preprocessor", cucumber(options));

      return config;
    },
    baseUrl: "http://localhost:5173",
    video: false,
    viewportHeight: 900,
    viewportWidth: 1440,
    numTestsKeptInMemory: 1,
    specPattern: "cypress/e2e/**/*.feature",
  },
});
