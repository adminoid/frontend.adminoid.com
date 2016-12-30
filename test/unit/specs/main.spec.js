/**
 * 1. Vue loadable
 * 2. Styles module loaded
 * 3. jQuery loaded and work
 * 4. Semantic UI JS loaded
 * 5.
 */

import { GlobalVue } from 'src/main.js'

describe('main.js', () => {
  it('main.js check GlobalVue', () => {
    expect(GlobalVue).to.be.a('object')
    // expect(typeof GlobalVue).toBe('object')
  })
  // it('check id attribute is #app', function () {
  //   expect(vm.$el.getAttribute('id')).toBe('app')
  // })
})
