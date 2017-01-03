import Vue from 'vue'
import TopMenu from 'src/components/TopMenu'

describe('testing component TopMenu', () => {
  console.info(TopMenu.checkTopOffset) // undefined
  var vm1 = new Vue(TopMenu)
  console.info(vm1.checkTopOffset) // function boundFn(a) { ... }
  sinon.spy(vm1, 'checkTopOffset')
  it('test 1', (done) => {
    vm1.checkTopOffset()
    console.info(vm1.checkTopOffset.callCount)
    done()
  })
  vm1.$mount()
  it('test 2', (done) => {
    console.warn(typeof TopMenu.created)
    console.warn(typeof vm1.created)
    console.info(vm1.checkTopOffset.callCount)
    vm1.$nextTick(() => {
      console.log(vm1.checkTopOffset.callCount)
      console.log(vm1.topOffset)
      done()
    })
  })
})
