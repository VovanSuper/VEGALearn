const { defineConfig } = require("cypress");

// const chromePath = 'C:/Users/vovan/AppData/Local/Google/Chrome/Application/chrome.exe'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-watch-and-reload/plugins')(on, config);
      return {
        // browsers: config.browsers.filter(
        //   (b) => b.family === 'chromium' && b.name !== 'electron'
        // ),
        // browserUrl: chromePath,
        ...config,
        baseUrl: 'http://172.16.1.16:81/',
        watchForFileChanges: true,
        
      }
    },
    env: {
        'cypress-watch-and-reload': {
          watch: ['metadata_*.xml'],
        },
    }
  },
});
