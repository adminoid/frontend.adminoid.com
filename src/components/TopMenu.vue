<script>
//  import $ from 'jquery'
  export default {
    data () {
      return {
        topOffset: 0,
        settings: {
          topOffsetForToggleAnimation: 300
        },
        selectors: {
          gsap: {
            leftHand: '#left-hand',
            rightHand: '#right-hand'
          }
        }
      }
    },
    created () {
      this.checkTopOffset()
      window.addEventListener('scroll', this.checkTopOffset)
//      this.leftHand = $(this.$el).find(this.selectors.gsap.leftHand)
    },
    methods: {
      checkTopOffset: function () {
        this.topOffset = window.pageYOffset
      },
      runLogoAnimation: function (direction = 'forward') {
        console.log(this.leftHand)
        if (direction === 'forward') {
          console.log(direction)
        } else if (direction === 'backward') {
          console.log(direction)
        }
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