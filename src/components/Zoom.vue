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
//          startLeftOffset: 0,
//          startTopOffset: 0
        },
        selectors: {
          image: this.image
        },
        cursor: {
          x: 0,
          y: 0
        },
        $wrapper: {},
        $image: {},
        padding: 0
      }
    },
    created: function () {
//      window.addEventListener('resize', this.calculateSizesAndProportions)
      window.onresize = this.calculateSizesAndProportions
    },
    mounted: function () {
      this.makeStartUpData()
      this.calculateSizesAndProportions()
    },
    beforeDestroy: function () {
//      window.removeEventListener('resize', this.calculateSizesAndProportions)
      window.onresize = null
    },
    methods: {
      makeStartUpData: function () {
        this.$wrapper = $(this.$el)
        this.$image = this.$wrapper.find(this.selectors.image)
      },
      calculateSizesAndProportions: function () {
        this.initialData.wrapperWidth = this.$wrapper.width()
        this.initialData.wrapperHeight = this.$wrapper.height()
        this.initialData.imageWidth = this.$image.width()
        this.initialData.imageHeight = this.$image.height()
        this.initialData.widthProportion = this.initialData.imageWidth / this.initialData.wrapperWidth
        this.initialData.heightProportion = this.initialData.imageHeight / this.initialData.wrapperHeight
        this.initialData.scale = (this.initialData.widthProportion >= this.initialData.heightProportion) ? this.initialData.widthProportion : this.initialData.heightProportion
        this.padding = (this.$wrapper.innerHeight() - this.$wrapper.height()) / 2
//        let leftAbs = parseInt(this.$image.css('left'), 10)
//        if (leftAbs) {
//          this.initialData.startLeftOffset = leftAbs - this.padding
//        } else if (this.padding > 0) {
//          this.initialData.startLeftOffset = -this.padding
//        }
//        let topAbs = parseInt(this.$image.css('top'), 10)
//        if (topAbs) {
//          this.initialData.startTopOffset = topAbs - this.padding
//        } else if (this.padding > 0) {
//          this.initialData.startTopOffset = -this.padding
//        }
      },
      startZoom: function (e) {
        this.calculateCursorPosition(e)
      },
      onZoom: function (e) {
        this.calculateCursorPosition(e)
      },
      stopZoom: function () {
      },
      calculateCursorPosition: function (e) {
        let xPos = e.pageX - this.$wrapper.offset().left - this.padding
        let yPos = e.pageY - this.$wrapper.offset().top - this.padding
        this.cursor.x = Math.round(xPos)
        this.cursor.y = Math.round(yPos)
      },
      calculateStartOffsets: function () {
//        this.cursor.startLeftOffset
      }
    }
//    ,watch: {
//      'initialData.startLeftOffset': function (newVal, oldVal) {
//        console.info(oldVal)
//        console.log(newVal)
//      }
//    }
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
    <img class="chrome zoom"
         src="/static/img/adminoid/pages/portfolio/presentations/ikmed-prices/chrome.jpg"
         alt=""
         style="left:-300px;top:-200px">
    <img class="ikmed-logo" src="/static/img/adminoid/pages/portfolio/presentations/ikmed-logo-big.png"
         alt="">
    <span class="debugger">{{ cursor.x }} / {{ cursor.y }}</span>
  </div>
</template>
<style>
  .debugger {
    position: absolute;
    top: -4px;
  }
  .content.window.fix {
    position: relative;
    overflow: hidden;
    min-height: 320px;
  }
  .content {
    flex-grow: 1;
    border: none;
    border-top: 1px solid rgba(34, 36, 38, .1);
    background: 0 0;
    margin: 0;
    padding: 1em;
    box-shadow: none;
    font-size: 1em;
    border-radius: 0;
  }
  .content.window > img {
    position: absolute;
  }
</style>