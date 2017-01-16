/**
 * 1. Vue loaded
 * 2. Styles module loaded -> e2e:styles.js
 * 3. jQuery loaded and work
 * 4. Semantic UI JS loaded
 * 5.
 */

import {GlobalVue} from 'src/main.js'
// import jQuery from 'jquery'

describe('main.js - index javascript file of app', () => {
  it('vm.$el loaded', () => {
    // expect(vm).to.be.a('object')
    expect(GlobalVue.$el).to.be.object
  })
  // xit('jQuery loaded', () => {
  //   expect(jQuery).to.be.object
  // })
})
