// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'e2e tests for portfolio': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.left.floated')
      .assert.containsText('h1.ui.blue.header', 'Инструменты, которые я использую для создания сайтов')
      // .assert.elementCount('img', 1)
      .end()
  }
}
