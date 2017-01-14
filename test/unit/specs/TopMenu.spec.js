import Vue from 'vue'
import TopMenu from 'src/components/TopMenu'
import {TweenMax, TimelineLite} from 'gsap'

describe('testing component TopMenu', () => {
  sinon.spy(TopMenu.methods, 'checkTopOffset')
  sinon.spy(TopMenu.methods, 'runLogoAnimation')
  /* eslint-disable no-new */
  var vmTopMenu = new Vue(TopMenu)
  it('expect top offset the threshold limit needed for run logotype animation', (done) => {
    expect(vmTopMenu.settings.topOffsetForToggleAnimation).to.be.above(1)
    done()
  })
  it('check if checkTopOffset called on created event', (done) => {
    expect(TopMenu.methods.checkTopOffset.callCount).to.equal(1)
    done()
  })
  it('check distance of the top on created', (done) => {
    expect(vmTopMenu.topOffset === window.pageYOffset).is.true
    done()
  })
  it('gsap: TweenLite are loadable', (done) => {
    expect(TweenMax).to.be.a('function')
    done()
  })
  it('gsap: TimelineLite are loadable', (done) => {
    expect(TimelineLite).to.be.a('function')
    done()
  })
  it('if set topOffset to (topOffsetForToggleAnimation + 1) must run forward animation', (done) => {
    vmTopMenu.topOffset = vmTopMenu.settings.topOffsetForToggleAnimation + 1
    vmTopMenu.$nextTick(function () {
      expect(TopMenu.methods.runLogoAnimation.callCount).to.equal(1)
      done()
    })
  })
  it('if set topOffset to (topOffsetForToggleAnimation - 1) must run backward animation and direction == backward', (done) => {
    vmTopMenu.topOffset = vmTopMenu.settings.topOffsetForToggleAnimation - 1
    vmTopMenu.$nextTick(function () {
      it('if set topOffset to (topOffsetForToggleAnimation - 1) must run backward animation', () => {
        expect(TopMenu.methods.runLogoAnimation.callCount).to.equal(2)
      })
      it('if set topOffset to (topOffsetForToggleAnimation - 1) direction argument must be "backward"', () => {
        expect(TopMenu.methods.runLogoAnimation.getCall(1).args[0]).to.equal('backward')
      })
      done()
    })
  })
})
