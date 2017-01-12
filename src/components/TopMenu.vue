<script>
//  import {TweenLite, TimelineLite, TimelineLite, CSSPlugin} from 'gsap'
  import {TweenMax, TimelineLite} from 'gsap'
  export default {
    data () {
      return {
        topOffset: 0,
        settings: {
          topOffsetForToggleAnimation: 300
        },
        selectors: {
          gsap: {
            svgLogoId: 'header-logo-svg',
            leftHandId: 'left-hand',
            rightHandId: 'right-hand',
            manBodyId: 'man-full',
            headId: 'head',
            eyePupilId: 'eye-pupil',
            textAdminoidId: 'stripped-logo-text',
            textsWebmasterId: 'web-Master',
            textsWebmasterLetterClass: 'wm-tl',
            textsWebmasterWrapperId: 'Rectangle-21',
            topMenuId: 'top-menu',
            topMenuItemClass: 'item'
          }
        },
        states: {
          animationRuns: false
        }
      }
    },
    created () {
      this.checkTopOffset()
      window.addEventListener('scroll', this.checkTopOffset)
    },
    methods: {
      checkTopOffset: function () {
        this.topOffset = window.pageYOffset
      },
      runLogoAnimation: function (direction = 'forward') {
        let timeline = this.compileTimeline()
        if (direction === 'forward') {
          timeline.play()
        } else if (direction === 'backward') {
          timeline.reverse(0)
        }
      },
      // I'm add only that method, and edit runLogoAnimation ^^^
      compileTimeline: function () {
        let part1time = 0.2
        let part2time = 0.5
        var logo = document.getElementById(this.selectors.gsap.svgLogoId)
        var leftHand = logo.getElementById(this.selectors.gsap.leftHandId)
        var rightHand = logo.getElementById(this.selectors.gsap.rightHandId)
        var manBody = logo.getElementById(this.selectors.gsap.manBodyId)
        var head = logo.getElementById(this.selectors.gsap.headId)
        var eyePupil = logo.getElementById(this.selectors.gsap.eyePupilId)
        var textAdminoid = logo.getElementById(this.selectors.gsap.textAdminoidId)
        var lettersWebmaster = Array.prototype.slice.call(logo.getElementById(this.selectors.gsap.textsWebmasterId).getElementsByClassName(this.selectors.gsap.textsWebmasterLetterClass))
        var textsWebmasterWrapper = logo.getElementById(this.selectors.gsap.textsWebmasterWrapperId)
        var topMenu = document.getElementById(this.selectors.gsap.topMenuId)
        var topMenuItemsForResizing = Array.prototype.slice.call(topMenu.getElementsByClassName(this.selectors.gsap.topMenuItemClass))
        topMenuItemsForResizing.push(topMenu)
        // Hands (waving)
        var tlLeftHand = new TimelineLite()
        tlLeftHand.add(TweenMax.fromTo(leftHand, 0.08, {
          rotation: 0
        }, {
          rotation: 35,
          transformOrigin: '90% 100%'
        }))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: -50, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: 35, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: -50, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: 35, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: -50, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: 35, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: -50, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: 35, transformOrigin: '90% 100%'}))
        tlLeftHand.add(TweenMax.to(leftHand, 0.08, {rotation: -75, transformOrigin: '90% 100%'}))
        var tlRightHand = new TimelineLite()
        tlRightHand.add(TweenMax.fromTo(rightHand, 0.08, {
          rotation: 0
        }, {
          rotation: -35,
          transformOrigin: '10% 100%'
        }))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: 50, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: -35, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: 50, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: -35, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: 50, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: -35, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: 50, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: -35, transformOrigin: '10% 100%'}))
        tlRightHand.add(TweenMax.to(rightHand, 0.08, {rotation: 75, transformOrigin: '10% 100%'}))
        var tlHands = new TimelineLite()
        tlHands.add(tlLeftHand, 0)
        tlHands.add(tlRightHand, 0)
        // Body, part 1
        var tlBody = new TimelineLite()
        tlBody.add(TweenMax.fromTo(manBody, part1time,
            {y: 0, x: 0, rotation: 0},
            {y: -10, x: 20, rotation: 35, transformOrigin: '50% 50%'}
        ), 0)
        // Body, part 2
        tlBody.add('body2', part1time)
        tlBody.add(TweenMax.fromTo(manBody, part2time,
          {y: -10, x: 20, rotation: 35, transformOrigin: '50% 50%'},
          {y: -5, x: 180, rotation: 90, transformOrigin: '50% 50%'}
        ), 'body2')
        // Head
        var tlHead = new TimelineLite()
        tlHead.fromTo(head, 0.3,
          {opacity: 1},
          {opacity: 0}
        )
        // SVG img size (begin from part1time)
        var tlLogoSize = new TimelineLite()
        tlLogoSize.add('body2', part1time)
        tlLogoSize.add(TweenMax.fromTo(logo, part1time,
            {attr: {viewBox: '0 0 219 53'}, width: 219, height: 53},
            {attr: {viewBox: '0 0 219 42'}, width: 219, height: 42}
        ), 'body2')
        // Eye-pupil
        var tlEyePupil = new TimelineLite()
        tlEyePupil.add('body2', part1time)
        tlEyePupil.add(TweenMax.fromTo(eyePupil, part1time,
            {opacity: 0},
            {opacity: 1}
        ), 'body2')
        // Text adminoid
        var tlTextAdminoid = new TimelineLite()
        tlTextAdminoid.add(TweenMax.fromTo(textAdminoid, part1time + part2time,
            {x: 0, y: 24},
            {x: -50, y: 7}
        ))
        // Text webmaster textsWebmaster
        var tlTextWebmaster = new TimelineLite()
        tlTextWebmaster.add(
          TweenMax.staggerFromTo(lettersWebmaster.reverse(), (0.1),
            {opacity: 1},
            {opacity: 0},
            0.05
          )
        )
        // Webmaster Wrapper
        var tlTextWebmasterWrapper = new TimelineLite()
        tlTextWebmasterWrapper.add('body2', 0.2)
        tlTextWebmasterWrapper.add(TweenMax.fromTo(textsWebmasterWrapper, 0.5,
            {opacity: 1},
            {opacity: 0}
        ), 'body2')
        // TopMenu height reduction/increase
        var tlTopMenu = new TimelineLite()
        tlTopMenu.add('body2', part1time)
        console.log(topMenuItemsForResizing)
        tlTopMenu.add(TweenMax.staggerFromTo(topMenuItemsForResizing, part1time,
            {height: '4.66667rem'},
            {height: '3.66667rem'},
            0
        ), 'body2')
        // Conclusion
        var timeline = new TimelineLite({paused: true})
        timeline.add(tlHands, 0)
        timeline.add(tlBody, 0)
        timeline.add(tlHead, 0)
        timeline.add(tlLogoSize, 0)
        timeline.add(tlEyePupil, 0)
        timeline.add(tlTextAdminoid, 0)
        timeline.add(tlTextWebmaster, 0)
        timeline.add(tlTextWebmasterWrapper, 0)
        timeline.add(tlTopMenu, 0)
        return timeline
      }
    },
    watch: {
      topOffset: function (val, oldVal) {
        if (oldVal < this.settings.topOffsetForToggleAnimation && val >= this.settings.topOffsetForToggleAnimation) {
          this.runLogoAnimation()
        } else if (oldVal >= this.settings.topOffsetForToggleAnimation && val < this.settings.topOffsetForToggleAnimation) {
          this.runLogoAnimation('backward')
        }
      }
    }
  }
</script>