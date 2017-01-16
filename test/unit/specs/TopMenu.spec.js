import Vue from 'vue'
import TopMenu from 'src/components/TopMenu'
// import {TweenMax, TimelineLite} from 'gsap'
// import $ from 'jquery'

describe('tests for component TopMenu', () => {
  describe('animation logo', () => {
    it('create checkTopOffset() method (puts current offset to $data.topOffset)', () => {
      expect(TopMenu.methods.checkTopOffset).to.be.a('function')
    })
    it('run checkTopOffset() when mounted', (done) => {
      sinon.spy(TopMenu.methods, 'checkTopOffset')
      let vmTopMenu = new Vue(TopMenu)
      vmTopMenu.$mount()
      vmTopMenu.$nextTick(function () {
        expect(TopMenu.methods.checkTopOffset.callCount).to.equal(1)
        done()
      })
    })
    it('add event listener on scroll, bind it to checkTopOffset() method', () => {
      expect(window.onscroll).is.function
    })
    it('timeline is created and put to $data', () => {
      let vmTopMenu = new Vue(TopMenu)
      vmTopMenu.$mount()
      expect(vmTopMenu.timeline).to.be.a('object')
    })
    it('make runLogoAnimation method', () => {
      expect(TopMenu.methods.runLogoAnimation).to.be.a('function')
    })
    describe('add watcher on topOffset', () => {
      sinon.spy(TopMenu.methods, 'runLogoAnimation')
      var vmTopMenu = new Vue(TopMenu)
      vmTopMenu.$mount()
      it('run forward', (done) => {
        // 1. change topOffset bigger from settings.topOffsetForToggleAnimation
        vmTopMenu.topOffset = vmTopMenu.settings.topOffsetForToggleAnimation
        // check for runLogoAnimation method +1 times
        vmTopMenu.$nextTick(function () {
          expect(TopMenu.methods.runLogoAnimation.getCall(0).args[0]).to.be.undefined
          done()
        })
      })
      it('run backward', (done) => {
        // 1. change topOffset lower from settings.topOffsetForToggleAnimation
        vmTopMenu.topOffset = vmTopMenu.settings.topOffsetForToggleAnimation - 1
        vmTopMenu.$nextTick(function () {
          expect(TopMenu.methods.runLogoAnimation.getCall(1).args[0]).to.equal('backward')
          done()
        })
      })
    })
  })
})
