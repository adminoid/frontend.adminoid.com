<script>
  import $ from 'jquery'
  export default {
    props: {
      image: {
        type: String,
        default: '.zoom'
      }
    },
    data: function () {
      return {
        initialData: {
          wrapperWidth: 0,
          wrapperHeight: 0,
          imageWidth: 0,
          imageHeight: 0,
          widthProportion: 1,
          heightProportion: 1
        },
        selectors: {
          image: this.image
        },
        cursor: {
          x: 0,
          y: 0
        }
      }
    },
    mounted: function () {
      this.calculateSizesAndProportions()
    },
    created: function () {
//      window.addEventListener('resize', this.calculateSizesAndProportions)
      window.onresize = this.calculateSizesAndProportions
    },
//    beforeDestroy: function () {
//      window.removeEventListener('resize', this.calculateSizesAndProportions)
//    },
    methods: {
      calculateSizesAndProportions: function () {
        let $wrapper = $(this.$el)
        this.initialData.wrapperWidth = $wrapper.width()
        this.initialData.wrapperHeight = $wrapper.height()
        let $image = $wrapper.find(this.selectors.image)
        this.initialData.imageWidth = $image.width()
        this.initialData.imageHeight = $image.height()
        this.initialData.widthProportion = this.initialData.imageWidth / this.initialData.wrapperWidth
        this.initialData.heightProportion = this.initialData.imageHeight / this.initialData.wrapperHeight
        this.initialData.scale = (this.initialData.widthProportion >= this.initialData.heightProportion) ? this.initialData.widthProportion : this.initialData.heightProportion
      },
      startZoom: function (e) {
        this.calculateCursorPosition(e)
      },
      onZoom: function (e) {
      },
      stopZoom: function () {
      },
      calculateCursorPosition: function (e) {
        let $el = $(e.target)
        var padding = ($el.innerHeight() - $el.height()) / 2
        let xPos = e.pageX - $el.offset().left - padding
        let yPos = e.pageY - $el.offset().top - padding
        this.cursor.x = Math.round(xPos)
        this.cursor.y = Math.round(yPos)
      }
    }
//    computed: {
//      widthProportion: function () {
//        return (this.initialData.imageWidth / this.initialData.wrapperWidth)
//      },
//      heightProportion: function () {
//        return (this.initialData.imageHeight / this.initialData.wrapperHeight)
//      }
//    }
  }
</script>
<template>
  <div class="content window fix" id="ikmed-prices"
       @mouseenter="startZoom" @touchstart="startZoom"
       @mousemove="onZoom" @touchmove="onZoom"
       @mouseleave="stopZoom" @touchend="stopZoom">
    <img class="chrome zoom" src="/static/img/adminoid/pages/portfolio/presentations/ikmed-prices/chrome.jpg"
         alt="">
    <img class="ikmed-logo" src="/static/img/adminoid/pages/portfolio/presentations/ikmed-logo-big.png"
         alt="">
    <span class="debugger">@{{ cursor.x }} / @{{ cursor.y }}</span>
  </div>
</template>
<style>
  .debugger {
    position: absolute;
    margin-top: -19px;
  }
</style>