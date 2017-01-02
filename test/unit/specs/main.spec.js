/**
 * 1. Vue loaded
 * 2. Styles module loaded -> e2e:styles.js
 * 3. jQuery loaded and work
 * 4. Semantic UI JS loaded
 * 5.
 */

import Vue from 'vue'
import Styles from 'src/components/Styles'
import {GlobalVue} from 'src/main.js'
import jQuery from 'jquery'

describe('main.js - index javascript file of app', () => {
  const vmStyles = new Vue(Styles).$mount()
  it('vm.$el loaded', () => {
    // expect(vm).to.be.a('object')
    expect(GlobalVue.$el).to.be.object
  })
  it('Styles module loaded', () => {
    expect(vmStyles).to.be.object
  })
  it('jQuery loaded', () => {
    expect(jQuery).to.be.object
  })
  // Now not need
  // it('semantic.min.js loaded', () => {
  //   expect(jQuery).to.be.object // expect(vm).to.be.a('object')
  // })
})

