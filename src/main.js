// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Styles from './components/Styles'
import jQuery from 'jquery'

window.jQuery = jQuery
jQuery(document).ready(function () {
  require('../node_modules/semantic-ui/dist/semantic.min.js')
})

/* eslint-disable no-new */
var GlobalVue = new Vue({
  el: '#app',
  components: { Styles }
})

let color = jQuery('#top-menu .ui.menu .item').css('color')
console.log(color)

export { GlobalVue }
