import Vue from 'vue'
import Zoom from 'src/components/Zoom'
import $ from 'jquery'

/* eslint-disable no-unused-vars */
/**
 * get template for wrapper Vue object make Vue with Zoom component and that template
 * @param wrapperTemplate
 * @returns {Vue$2}
 */
const makeWrapper = (wrapperTemplate = '<div><zoom ref="component"></zoom></div>') => {
  return new Vue({
    template: wrapperTemplate,
    components: {Zoom}
  })
}

const startWrapperWidth = 1093
const startWrapperHeight = 289
const startImageWidth = 1696
const startImageHeight = 949
const padding = 15

/**
 * gets vueWrapper and return component from it
 * @param vueWrapper
 * @returns {'Zoom component'}
 */
const setSizesForComponent = (vueWrapper) => {
  vueWrapper.$mount()
  var cmp = vueWrapper.$refs.component
  var $elWrapper = $(cmp.$el)
  var $elImage = $elWrapper.find(cmp.selectors.image)
  $elWrapper.width(startWrapperWidth)
  $elWrapper.height(startWrapperHeight)
  $elWrapper.css({padding: padding})
  $elImage.width(startImageWidth)
  $elImage.height(startImageHeight)
  cmp.calculateSizesAndProportions()
  return cmp
}

const makeEvent = (name) => {
  let e = document.createEvent('HTMLEvents')
  e.initEvent(name, true, true)
  return e
}

describe('tests for Zoom component', () => {
  describe('check startup setup selectors', () => {
    it('check setup zoom image selectors from params', () => {
      let wrapperWithDiffParams = makeWrapper('<div><zoom ref="component" image=".zoom-different"></zoom></div>')
      wrapperWithDiffParams.$mount()
      expect(wrapperWithDiffParams.$refs.component.image).to.equal('.zoom-different')
    })
    it('check setup zoom image selector with default params', () => {
      let wrapperWithoutParams = makeWrapper()
      wrapperWithoutParams.$mount()
      expect(wrapperWithoutParams.$refs.component.image).to.equal('.zoom')
    })
  })
  describe('operations when start', () => {
    const vueWrapper = makeWrapper()
    sinon.spy(Zoom.methods, 'calculateSizesAndProportions')
    it('check for calculateSizesAndProportions running on mount', () => {
      let callsBeforeMount = Zoom.methods.calculateSizesAndProportions.callCount
      vueWrapper.$mount()
      expect(Zoom.methods.calculateSizesAndProportions.callCount).is.equal(callsBeforeMount + 1)
    })
    it('expect event on window resize', () => {
      var callsBeforeResize = Zoom.methods.calculateSizesAndProportions.callCount
      let e = makeEvent('resize')
      window.dispatchEvent(e)
      var callsAfterResize = Zoom.methods.calculateSizesAndProportions.callCount
      expect(callsAfterResize).is.equal(callsBeforeResize + 8) // TODO: 7 - whence seven come from?
    })
  })
  describe('tests for makeStartUpData method', () => {
    const vueWrapper = makeWrapper()
    var cmp = setSizesForComponent(vueWrapper)
    describe('jquery objects', () => {
      it('check $wrapper', () => {
        expect(cmp.$wrapper).is.a('object')
      })
      it('check $image', () => {
        expect(cmp.$image).is.a('object')
      })
    })
  })
  describe('tests for calculateSizesAndProportions method', () => {
    const vueWrapper = makeWrapper()
    var cmp = setSizesForComponent(vueWrapper)
    describe('wrapper sizes', () => {
      it('check width', () => {
        expect(cmp.initialData.wrapperWidth).is.equal(startWrapperWidth)
      })
      it('check height', () => {
        expect(cmp.initialData.wrapperHeight).is.equal(startWrapperHeight)
      })
    })
    describe('zoom image sizes', () => {
      it('check width', () => {
        expect(cmp.initialData.imageWidth).is.equal(startImageWidth)
      })
      it('check height', () => {
        expect(cmp.initialData.imageHeight).is.equal(startImageHeight)
      })
    })
    describe('proportions', () => {
      it('check width proportion (how many times image width more than wrapper width)', () => {
        expect(cmp.initialData.widthProportion).is.equal(cmp.initialData.imageWidth / cmp.initialData.wrapperWidth - 1)
      })
      it('check height proportion (how many times image height more than wrapper height)', () => {
        expect(cmp.initialData.heightProportion).is.equal(cmp.initialData.imageHeight / cmp.initialData.wrapperHeight - 1)
      })
    })
    it('scale in calculateSizesAndProportions', () => {
      let maxProportion = (cmp.initialData.widthProportion >= cmp.initialData.heightProportion) ? cmp.initialData.widthProportion : cmp.initialData.heightProportion
      expect(cmp.initialData.scale).is.equal(maxProportion)
    })
  })
  describe('tests for zooming', () => {
    describe('check events', () => {
      describe('startZoom method (run on mouseenter)', () => {
        sinon.spy(Zoom.methods, 'startZoom')
        let vueWrapper = makeWrapper()
        let cmp = setSizesForComponent(vueWrapper)
        let e = document.createEvent('HTMLEvents')
        e.initEvent('mouseenter', true, true)
        e.pageX = 50
        e.pageY = 100
        let callsStartZoomBeforeMouseenter = Zoom.methods.startZoom.callCount
        cmp.$el.dispatchEvent(e)
        it('check run startZoom method on mouseenter', (done) => {
          cmp.$nextTick(() => {
            expect(Zoom.methods.startZoom.callCount).is.equal(callsStartZoomBeforeMouseenter + 1)
            done()
          })
        })
        it('startZoom check X cursor position is right', () => {
          expect(cmp.cursor.x).is.equal(35)
        })
        it('startZoom check Y cursor position is right', () => {
          expect(cmp.cursor.y).is.equal(85)
        })
      })
      describe('onZoom method (run on mousemove)', () => {
        sinon.spy(Zoom.methods, 'onZoom')
        let vueWrapper = makeWrapper()
        let cmp = setSizesForComponent(vueWrapper)
        let e = document.createEvent('HTMLEvents')
        e.initEvent('mousemove', true, true)
        e.pageX = 150
        e.pageY = 250
        let callsOnZoomBeforeMousemove = Zoom.methods.onZoom.callCount
        cmp.$el.dispatchEvent(e)
        it('check run onZoom method on mousemove', (done) => {
          cmp.$nextTick(() => {
            expect(Zoom.methods.onZoom.callCount).is.equal(callsOnZoomBeforeMousemove + 1)
            done()
          })
        })
        it('onZoom check X cursor position is right', () => {
          expect(cmp.cursor.x).is.equal(135)
        })
        it('onZoom check Y cursor position is right', () => {
          expect(cmp.cursor.y).is.equal(235)
        })
        describe('left and top computed props', () => {
          it('left', () => {
            expect(cmp.left).is.equal(-74)
          })
          it('top', () => {
            expect(cmp.top).is.equal(-536)
          })
        })
      })
      describe('stopZoom method (run on mouseleave)', () => {
        sinon.spy(Zoom.methods, 'stopZoom')
        let vueWrapper = makeWrapper()
        let cmp = setSizesForComponent(vueWrapper)
        let e = document.createEvent('HTMLEvents')
        e.initEvent('mouseleave', true, true)
        let callsStopZoomBeforeMouseleave = Zoom.methods.stopZoom.callCount
        cmp.$el.dispatchEvent(e)
        it('check run stopZoom method on mouseleave', (done) => {
          cmp.$nextTick(() => {
            expect(Zoom.methods.onZoom.callCount).is.equal(callsStopZoomBeforeMouseleave + 1)
            done()
          })
        })
      })
    })
  })
})
