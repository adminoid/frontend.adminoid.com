import Vue from 'vue'
import Styles from 'src/components/Styles'
import jQuery from 'jquery'

describe('Styles.vue', () => {
  const vm = new Vue(Styles).$mount()
  it('vm.$el is a object', () => {
    expect(vm.$el).to.be.object // expect(vm).to.be.a('object')
  })
  it('check applied styles', () => {
    vm.$nextTick(() => {
      let color = jQuery(vm.$el).find('#top-menu .ui.menu .item').css('color')
      expect(color).to.eq('#1254B0')
      expect(color).to.eq('rgb(18, 84, 176)')
    })
  })
})
