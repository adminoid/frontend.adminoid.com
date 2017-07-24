// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Styles from './components/Styles'
import TopMenu from './components/TopMenu'

// TODO uncomment below if need later semantic ui (js) and jQuery
import jQuery from 'jquery'
var $ = jQuery
// window.jQuery = jQuery
// jQuery(document).ready(function () {
//   require('../node_modules/semantic-ui/dist/semantic.min.js')
// })
var pageName = $('.ui.page.container').attr('id')
var components = {}
switch (pageName) {
  case 'index':
    let Clouds = require('./components/pages/index/Clouds')
    let EffectBlock = require('./components/pages/index/EffectBlock')
    components = {Styles, TopMenu, Clouds, EffectBlock}
    break
  case 'price':
    let Clock = require('./components/pages/price/Clock')
    components = {Styles, TopMenu, Clock}
    break
  case 'portfolio':
    let Zoom = require('./components/pages/portfolio/Zoom')
    components = {Styles, TopMenu, Zoom}
    break
  case 'process':
    let HalfRotate = require('./components/pages/process/HalfRotate')
    components = {Styles, TopMenu, HalfRotate}
    break
  default:
    components = {Styles, TopMenu}
}
/* eslint-disable no-new */
var GlobalVue = new Vue({
  el: '#app',
  components: components
})

export { GlobalVue }

// require.ensure([], function () {
//   /* eslint-disable no-unused-vars */
//   let Portfolio = require('./components/Portfolio')
//   components = {Styles, TopMenu, Portfolio}
// })
