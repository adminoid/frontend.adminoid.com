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
      }
    },
    watch: {
      topOffset: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      }
    }
  }
</script>