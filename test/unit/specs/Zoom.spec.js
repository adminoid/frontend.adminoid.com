import Vue from 'vue'
import Zoom from 'src/components/Zoom'
// import $ from 'jquery'

describe('Zoom component tests', () => {
  describe('Preparing', () => {
    describe('check for params wrapper, image, start(X|Y) are passed', () => {
      var wrapper = new Vue({
        template: '<div><zoom ref="component" wrapper="#ikmed-orders" image=".zoom" start="10|20"></zoom></div>',
        components: {Zoom}
      })
      var vm = wrapper.$mount()
      it('check wrapper prop', () => {
        expect(vm.$refs.component.wrapper).to.equal('#ikmed-orders')
      })
      it('check image prop', () => {
        expect(vm.$refs.component.image).to.equal('.zoom')
      })
      it('check start prop', () => {
        expect(vm.$refs.component.start).to.equal('10|20')
      })
      describe('expect calculate sizes and proportions', () => {
        it('expect calculateSizesAndProportions method', () => {
          expect(vm.$refs.component.calculateSizesAndProportions).is.a('function')
        })
        it('check for calculateSizesAndProportions set width', () => {
          console.log(vm.$refs.component.$el)
        })
        xit('check for calculateSizesAndProportions set height', () => {
        })
      })
    })
  })
})
