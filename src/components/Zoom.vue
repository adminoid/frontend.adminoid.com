<script>
  export default {
    props: ['wrapper', 'image', 'start'],
    data: function () {
      return {
        wrapperWidth: 0,
        wrapperHeight: 0,
        heightProportion: 1,
        widthProportion: 1
      }
    },
    mounted: function () {
      console.log('mounted')
    },
    methods: {
      calculateSizesAndProportions: function () {
        return 'ddd'
      }
    }
  }
</script>
<template>
  <div class="content window fix" id="ikmed-orders">
    <img class="ikmed-logo" src="/static/img/adminoid/pages/portfolio/presentations/ikmed-logo-big.png"
         alt="">
    <img class="chrome-1 zoom"
         src="/static/img/adminoid/pages/portfolio/presentations/ikmed-orders/chrome.jpg"
         alt="">
  </div>
</template>