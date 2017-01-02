import Vue from 'vue'
import TopMenu from 'src/components/TopMenu'

describe('TopMenu.vue', () => {
  const vmTopMenu = new Vue(TopMenu).$mount()
  it('TopMenu.$el loaded', () => {
    expect(vmTopMenu.$el).to.be.object
    // expect(vmTopMenu).to.be.a('object')
  })
  it('Check topOffset property (in $data)')
})

