import Vue from 'vue'
import Zoom from 'src/components/Zoom'
import Styles from 'src/components/Styles'
import $ from 'jquery'

describe('Zoom component tests', () => {
  describe('check startup setup selectors', () => {
    // $(window).width(5000).height(1300)
    it('check setup zoom image selectors from params', () => {
      var wrapperWithDiffParams = new Vue({
        template: '<div><zoom ref="component" image=".zoom-different"></zoom></div>',
        components: {Zoom}
      })
      wrapperWithDiffParams.$mount()
      expect(wrapperWithDiffParams.$refs.component.selectors.image).to.equal('.zoom-different')
    })
    it('check setup zoom image selector with default params', () => {
      var wrapperWithoutParams = new Vue({
        template: '<div><zoom ref="component"></zoom></div>',
        components: {Zoom}
      })
      wrapperWithoutParams.$mount()
      expect(wrapperWithoutParams.$refs.component.selectors.image).to.equal('.zoom')
    })
  })
  describe('check calculations', () => {
    var wrapper = new Vue({
      template: '<div><zoom ref="component"></zoom></div>',
      components: {Zoom, Styles}
    })
    sinon.spy(Zoom.methods, 'calculateSizesAndProportions')
    sinon.spy(Zoom.methods, 'startZoom')
    sinon.spy(Zoom.methods, 'onZoom')
    sinon.spy(Zoom.methods, 'stopZoom')
    var callsBeforeMount = Zoom.methods.calculateSizesAndProportions.callCount
    wrapper.$mount()
    var callsAfterMount = Zoom.methods.calculateSizesAndProportions.callCount
    it('check for calculateSizesAndProportions running on mount', () => {
      expect(callsAfterMount).is.equal(callsBeforeMount + 1)
    })
    it('expect event on window resize', () => {
      let callsBeforeResize = Zoom.methods.calculateSizesAndProportions.callCount
      $(window).trigger('resize')
      expect(Zoom.methods.calculateSizesAndProportions.callCount).is.equal(callsBeforeResize + 1)
    })
    describe('tests for calculateSizesAndProportions method', () => {
      // setup wrapper and zoom image sizes like in browser with styles
      let startWrapperWidth = 1093
      let startWrapperHeight = 289
      let startImageWidth = 1696
      let startImageHeight = 949
      let padding = 15
      var cmp = wrapper.$refs.component
      var $elWrapper = $(cmp.$el)
      var $elImage = $elWrapper.find(cmp.selectors.image)
      $elWrapper.width(startWrapperWidth)
      $elWrapper.height(startWrapperHeight)
      $elWrapper.css({padding: padding})
      $elImage.width(startImageWidth)
      $elImage.height(startImageHeight)
      cmp.calculateSizesAndProportions()
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
          expect(cmp.initialData.widthProportion).is.equal(cmp.initialData.imageWidth / cmp.initialData.wrapperWidth)
        })
        it('check height proportion (how many times image height more than wrapper height)', () => {
          expect(cmp.initialData.heightProportion).is.equal(cmp.initialData.imageHeight / cmp.initialData.wrapperHeight)
        })
      })
    })
    describe('tests for zooming', () => {
      var cmp = wrapper.$refs.component
      it('set scale in calculateSizesAndProportions', () => {
        let maxProportion = (cmp.initialData.widthProportion >= cmp.initialData.heightProportion) ? cmp.initialData.widthProportion : cmp.initialData.heightProportion
        expect(cmp.initialData.scale).is.equal(maxProportion)
      })
      describe('check events', () => {
        describe('test startZoom on mouseenter and other calculations', () => {
          describe('tests for startZoom method (run on mouseenter)', () => {
            let callsStartZoomBeforeMouseenter = Zoom.methods.startZoom.callCount
            let e = document.createEvent('HTMLEvents')
            e.initEvent('mouseenter', true, true)
            cmp.$el.dispatchEvent(e)
            it('check run startZoom method on mouseenter', (done) => {
              cmp.$nextTick(() => {
                expect(Zoom.methods.startZoom.callCount).is.equal(callsStartZoomBeforeMouseenter + 1)
                done()
              })
            })
          })
        })
        it('check run startZoom method on mousemove', (done) => {
          let callsOnZoomBeforeMousemove = Zoom.methods.onZoom.callCount
          var e = document.createEvent('HTMLEvents')
          e.initEvent('mousemove', true, true)
          cmp.$el.dispatchEvent(e)
          cmp.$nextTick(() => {
            expect(Zoom.methods.onZoom.callCount).is.equal(callsOnZoomBeforeMousemove + 1)
            done()
          })
        })
        it('check run stopZoom method on mouseleave', (done) => {
          let callsStopZoomBeforeMouseleave = Zoom.methods.stopZoom.callCount
          var e = document.createEvent('HTMLEvents')
          e.initEvent('mouseleave', true, true)
          cmp.$el.dispatchEvent(e)
          cmp.$nextTick(() => {
            expect(Zoom.methods.onZoom.callCount).is.equal(callsStopZoomBeforeMouseleave + 1)
            done()
          })
        })
      })
    })
  })
})
