<script>
  export default {
    data () {
      return {
        topOffset: 0,
        settings: {
          topOffsetForToggleAnimation: 300
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
//        console.log(direction)
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