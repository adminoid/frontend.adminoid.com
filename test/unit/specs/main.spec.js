import Vue from 'vue'
import Main from 'src/main.js'
describe('main.js', () => {
  const vm = new Vue(Main).$mount()
  it('main.js mount (look created handler)', () => {
    expect(typeof vm.created).toBe('function')
  })
  it('check id attribute is #app', function () {
    expect(vm.$el.getAttribute('id')).toBe('app')
  })
})
