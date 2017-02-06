import Vue from 'vue'
import TopMenu from 'src/components/TopMenu'
import $ from 'jquery'

const makeEvent = (name) => {
  let e = document.createEvent('HTMLEvents')
  e.initEvent(name, true, true)
  return e
}

const makeWrapper = (wrapperTemplate = '<div id="wrapper"><top-menu ref="component"></top-menu></div>') => {
  return new Vue({
    template: wrapperTemplate,
    components: {TopMenu}
  })
}

const wrWidth = 1200
const wrHeight = 1000
const cmpWidth = 1200
const cmpHeight = 70

const setStartSizes = (vueWrapper) => {
  vueWrapper.$mount()
  let $wr = $(vueWrapper.$el)
  $wr.width(wrWidth)
  $wr.height(wrHeight)
  let cmp = vueWrapper.$refs.component
  let $cmp = $(cmp.$el)
  $cmp.width(cmpWidth)
  $cmp.height(cmpHeight)
  return cmp
}

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
      expect(window.scroll).is.a('function')
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
          expect(TopMenu.methods.runLogoAnimation.getCall(0).args[0]).is.a('undefined')
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
  describe('eye moves on mouse move', () => {
    let wrapper = makeWrapper()
    let cmp = setStartSizes(wrapper)
    describe('check mouse move event handler', () => {
      describe('cursor position must change on mousemove', () => {
        var e = makeEvent('mousemove')
        e.pageX = 250
        e.pageY = 300
        cmp.reduced = true
        window.dispatchEvent(e)
        it('x position', () => {
          expect(cmp.cursor.x).is.equal(250)
        })
        it('y position', () => {
          expect(cmp.cursor.y).is.equal(300)
        })
        it('check eyeTransformWithAngle prop', () => {
          expect(cmp.eyeTransformWithAngle).is.equal('translate(13.000000, 36.000000) rotate(50.19442890773482) translate(-13.000000, -36.000000) translate(8.000000, 31.000000)')
        })
      })
    })
  })
})
