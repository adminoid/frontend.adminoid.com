<script>
  import $ from 'jquery'
  export default {
    props: {
      image: {
        type: String,
        default: '.zoom'
      },
      startLeft: {
        type: Number,
        default: 0
      },
      startTop: {
        type: Number,
        default: 0
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
          heightProportion: 1,
          startLeft: this.startLeft,
          startTop: this.startTop
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
      window.addEventListener('resize', this.calculateSizesAndProportions)
    },
    mounted: function () {
      this.makeStartUpData()
      this.calculateSizesAndProportions()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.calculateSizesAndProportions)
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
        this.initialData.widthProportion = this.initialData.imageWidth / this.initialData.wrapperWidth - 1
        this.initialData.heightProportion = this.initialData.imageHeight / this.initialData.wrapperHeight - 1
        this.initialData.scale = (this.initialData.widthProportion >= this.initialData.heightProportion) ? this.initialData.widthProportion : this.initialData.heightProportion
        this.padding = (this.$wrapper.innerHeight() - this.$wrapper.height()) / 2
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
        this.cursor.x = parseInt(xPos, 10)
        this.cursor.y = parseInt(yPos, 10)
      }
    },
    computed: {
      left: function () {
        return -parseInt(this.cursor.x * (this.initialData.widthProportion), 10)
      },
      top: function () {
        return -parseInt(this.cursor.y * (this.initialData.heightProportion), 10)
      }
    }
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
         :style="{ left: left + 'px', top: top + 'px' }">
    <img class="ikmed-logo" src="/static/img/adminoid/pages/portfolio/presentations/ikmed-logo-big.png"
         alt="">
  </div>
</template>
<style>
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