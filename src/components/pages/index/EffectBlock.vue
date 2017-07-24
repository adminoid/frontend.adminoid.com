<script>
    export default{
      data () {
        return {
          isHover: false
        }
      },
      methods: {
        getClass: function () {
          return (this.isHover) ? 'hover' : 'un-hover'
        },
        toggleClass: function () {
          this.isHover = !this.isHover
        }
      }
    }
</script>
