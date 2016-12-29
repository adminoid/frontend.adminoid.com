import Vue from 'vue'
import Styles from 'src/components/Styles'

describe('Styles.vue', () => {
  const vm = new Vue(Styles).$mount()
  it('some css property', () => {
    expect(vm).to.be.object
    expect(vm.$el.querySelector('h1.ui.blue.header').css('color')).to.eq('#1254B0!important')
  })
})
