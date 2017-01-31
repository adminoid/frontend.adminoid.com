<script>
  import $ from 'jquery'
  export default {
    data: function () {
      return {
        initData: {
          width: 0,
          height: 0
        },
        cursor: {
          x: 0,
          y: 0
        }
      }
    },
    created: function () {
      window.addEventListener('resize', this.makeInitData)
    },
    mounted: function () {
      this.makeInitData()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.makeInitData)
    },
    methods: {
      makeInitData: function () {
        let $el = $(this.$el)
        this.initData.width = $el.width()
        this.initData.height = $el.height()
      },
      onHover: function (e) {
        this.cursor.x = e.pageX
        this.cursor.y = e.pageY
        console.info(this.widthPercent)
      }
    },
    computed: {
      widthPercent: function () {
        return this.cursor.x / (this.initData.width / 100)
      }
    }
  }
</script>
<template>
  <div class="sixteen wide column message" @mousemove="onHover">
    <h2>Проектирование</h2>
    <p>
      {{ widthPercent }} <br>
      Фундаментом любого проекта является проектирование. Прежде чем что-то делать нужно понять что именно.
      И уже после того, как стало ясно что делать, можно думать над тем как именно делать. И только потом можно
      начинать подсчитывать примерные сроки и цену. Если вам кто-то сказал цену или срок на проект без
      предварительного проектирования - то этот человек совсем не ценит свои слова и бросает их на ветер как
      пустой фантик. Ибо чтобы что-то сложить и получить конкретные цифры - надо иметь конкретные слагаемые.
      Если вы верите пустым обещаниям или надеетесь поймать на слове, чтобы вам делали бесплатно часть работы -
      значит вы достойны друг друга, вот и мучайтесь, пожалуйста, а мне работать не мешайте.
      Для проектирования использую lucidchart. Для логики я рисую блок схемы. Для баз данных - ERM диаграммы.
    </p>
  </div>
</template>
<style></style>