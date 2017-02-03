import Vue from 'vue'
import HalfRotate from 'src/components/HalfRotate'
import $ from 'jquery'

const makeWrapper = (wrapperTemplate = '<div><half-rotate ref="component"></half-rotate></div>') => {
  return new Vue({
    template: wrapperTemplate,
    components: {HalfRotate}
  })
}

const startWidth = 1083
const startHeight = 195

const setStartSizes = (vueWrapper) => {
  vueWrapper.$mount()
  let cmp = vueWrapper.$refs.component
  let $block = $(cmp.$el)
  $block.width(startWidth)
  $block.height(startHeight)
  cmp.makeInitData()
  return cmp
}

const makeEvent = (name) => {
  let e = document.createEvent('HTMLEvents')
  e.initEvent(name, true, true)
  return e
}

sinon.spy(HalfRotate.methods, 'makeInitData')
sinon.spy(HalfRotate.methods, 'onHover')
sinon.spy(HalfRotate.methods, 'onLeave')

describe('Tests for HalfRotate component', () => {
  describe('on mount and window resize recalculate base props', () => {
    describe('for saving width and height of rotation block', () => {
      let wrapper = makeWrapper()
      let cmp = setStartSizes(wrapper)
      it('check width', () => {
        expect(cmp.initData.width).is.equal(1123)
      })
      it('check height', () => {
        expect(cmp.initData.height).is.equal(235)
      })
    })
    describe('run makeInitData on window resize', () => {
      it('run makeInitData on window resize', () => {
        var callsBefore = HalfRotate.methods.makeInitData.callCount
        let e = makeEvent('resize')
        window.dispatchEvent(e)
        var callsAfter = HalfRotate.methods.makeInitData.callCount
        expect(callsAfter).is.equal(callsBefore + 2)
      })
    })
  })
  describe('calculations on mouse move', () => {
    describe('on hover calc percent of height and width', () => {
      let wrapper = makeWrapper()
      let cmp = setStartSizes(wrapper)
      let e = makeEvent('mousemove')
      e.pageX = 150
      e.pageY = 50
      cmp.$el.dispatchEvent(e)
      it('check X cursor position', () => {
        expect(cmp.cursor.x).is.equal(150)
      })
      it('check Y cursor position', () => {
        expect(cmp.cursor.y).is.equal(50)
      })
      describe('angle factors', () => {
        it('width angle', () => {
          expect(cmp.widthAngle).is.equal(3.7)
        })
        it('height angle', () => {
          expect(cmp.heightAngle).is.equal(-5.800000000000001)
        })
      })
      describe('On mouse leave event return rotations to zeroes', () => {
        let callsBefore = HalfRotate.methods.onLeave.callCount
        let e = makeEvent('mouseleave')
        it('onLeave must running', () => {
          cmp.$el.dispatchEvent(e)
          expect(HalfRotate.methods.onLeave.callCount).is.equal(callsBefore + 1)
        })
        describe('check for zeroes after mouseleave event', () => {
          it('check x angle for zero', () => {
            expect(cmp.widthAngle).is.equal(0)
          })
          it('check y angle for zero', () => {
            expect(cmp.heightAngle).is.equal(0)
          })
        })
      })
    })
  })
})
