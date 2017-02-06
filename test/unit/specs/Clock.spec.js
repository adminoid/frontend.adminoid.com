import Vue from 'vue'
import Clock from 'src/components/Clock'
// import {TweenLite} from 'gsap'
// import $ from 'jquery'

const makeEvent = (name) => {
  let e = document.createEvent('HTMLEvents')
  e.initEvent(name, true, true)
  return e
}

const makeWrapper = (wrapperTemplate = '<div><clock ref="component"></clock></div>') => {
  return new Vue({
    template: wrapperTemplate,
    components: {Clock}
  })
}

describe('Tests for clock component', () => {
  describe('on mouseover event', () => {
    sinon.spy(Clock.methods, 'onHover')
    var callsBefore = Clock.methods.onHover.callCount
    let wr = makeWrapper()
    wr.$mount()
    let cmp = wr.$refs.component
    it('on mouseover run onHover', () => {
      let e = makeEvent('mouseover')
      cmp.$el.dispatchEvent(e)
      expect(Clock.methods.onHover.callCount).is.equal(callsBefore + 1)
    })
  })
  describe('on mouseleave event', () => {
    sinon.spy(Clock.methods, 'onLeave')
    var callsBefore = Clock.methods.onLeave.callCount
    let wr = makeWrapper()
    wr.$mount()
    let cmp = wr.$refs.component
    it('on mouseleave run onLeave', () => {
      let e = makeEvent('mouseleave')
      cmp.$el.dispatchEvent(e)
      expect(Clock.methods.onLeave.callCount).is.equal(callsBefore + 1)
    })
  })
  describe('startup calculations', () => {
    describe('making timeline on mount', () => {
      sinon.spy(Clock.methods, 'compileTimeline')
      var callsBefore = Clock.methods.compileTimeline.callCount
      let wr = makeWrapper()
      it('compileTimeline run on mount event', () => {
        wr.$mount()
        expect(Clock.methods.compileTimeline.callCount).is.equal(callsBefore + 1)
      })
      it('check timeline object as data prop', () => {
        expect(wr.$refs.component.timeline.paused).is.a('function')
      })
    })
  })
})
