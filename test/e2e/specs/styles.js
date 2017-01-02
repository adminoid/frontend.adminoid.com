// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'e2e tests applying Styles module': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
  
    browser
    .url(devServer)
    .waitForElementVisible('#top-menu', 5000)
    .expect.element('#top-menu').to.have.css('border-bottom').which.equals('1px solid rgb(142, 180, 233)')
    // .end()
    
    // browser
    // .waitForElementVisible('#app', 5000)
    // .assert.elementPresent('#top-menu .ui.menu .item')
    // // .expect.element('#top-menu .ui.menu .item').to.have.css('color').which.equals('#1254B0')
    // .end()
  }
}
