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
<template>
  <div class="ui container effect-block" v-bind:class="getClass()" v-on:click="toggleClass">
    <img class="ui fluid image" src="static/img/adminoid/pages/main/reliability.jpg">
    <div class="inner">
      <div class="text">
        <p>За годы работы (с июня 2008) на крупнейшей российской бирже фриланса FL.ru у меня только положительные отзывы
          и завершенные сделки (см. отзывы).
        <p>В начале пути, когда я был неопытен, шанс совершить ошибку был еще велик, но я им не воспользовался.</p>
        <p>А как теперь накосячить ума не приложу…</p>
      </div>
    </div>
  </div>
</template>