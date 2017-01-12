# Tools for unit and e2e testing

## Sinon.JS
This is spies for testing functions, methods and so on  
[https://habrahabr.ru/company/ua-hosting/blog/274317/](https://habrahabr.ru/company/ua-hosting/blog/274317/)  
Example:  
```javascript
var callback = sinon.spy();
```  
Test with Sinon.JS  
```javascript
if('Send should dispatch "declinedWorkflowTask" with the choice payload.', () => {
  const vm = getComponent('Bob').$mount();
  const component = vm.$refs.component;

  let spy = sinon.spy();
  vm.$on('declinedWorkflowTask', spy);

  component.sendReply();

  expect(spy).to.have.been.calledWith({
    choice: null,
    text: ''
  });
});
```

## Chai
[http://chaijs.com/](http://chaijs.com/)
This is testing vars, value  
Example:  
```javascript
expect(foo).to.be.a('string');
```
Test with Chai  
```javascript
it('Should be valid only when a radio option is selected.', () => {
  const vm = getComponent('Bob').$mount();
  const component = vm.$refs.component;
  expect(component.isFormValid).to.be.false;

  component.picked = 3;
  component.$nextTick(() => {
    expect(component.isFormValid).to.be.true;
  });
});
```

## Mocha
Framework for test wrapping  
Example:  
```javascript
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

## Nightwatch.js
Testing with Selenium browser automation server  
Example:  
```javascript
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
```

---

Look [there](http://www.slideshare.net/coulix/vuejs-testing) for more examples.
