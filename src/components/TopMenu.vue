<script>
  export default {
    data () {
      return {
        topOffset: 0
      }
    },
    created () {
      this.checkTopOffset()
    },
    methods: {
      checkTopOffset: function () {
        this.topOffset = 237
      }
    }
  }
</script>