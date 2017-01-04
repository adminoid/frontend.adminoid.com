import Vue from 'vue'
import TopMenu from 'src/components/TopMenu'

describe('testing component TopMenu', () => {
  sinon.spy(TopMenu.methods, 'checkTopOffset')
  // var vm1 = new Vue(TopMenu)
  /* eslint-disable no-new */
  var vmTopMenu = new Vue(TopMenu)
  it('expect top offset needed for run logotype animation', (done) => {
    expect(vmTopMenu.settings.topOffsetForToggleAnimation).to.be.above(1)
    done()
  })
  it('check if checkTopOffset called on created event', (done) => {
    expect(TopMenu.methods.checkTopOffset.callCount).to.equal(1)
    done()
  })
  it('check distance of the top on created', (done) => {
    // expect(window.pageYOffset).to.equal(0)
    expect(vmTopMenu.topOffset === window.pageYOffset).is.true
    done()
  })
  it('if set topOffset to (topOffsetForToggleAnimation + 1) must run forward animation', (done) => {
    let bigOffset = vmTopMenu.settings.topOffsetForToggleAnimation + 1
    vmTopMenu.topOffset = bigOffset
    done()
  })
})
