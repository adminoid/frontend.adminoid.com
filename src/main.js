// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Styles from './components/Styles'
import TopMenu from './components/TopMenu'

// TODO uncomment below if need later semantic ui (js) and jQuery
// import jQuery from 'jquery'
// window.jQuery = jQuery
// jQuery(document).ready(function () {
//   require('../node_modules/semantic-ui/dist/semantic.min.js')
// })

const page = 'no-portfolio'
// const page = 'portfolio'
if (page === 'portfolio') {
  require.ensure([], function () {
    /* eslint-disable no-unused-vars */
    let Portfolio = require('./components/Portfolio')
    console.log(Portfolio)
  })
}

/* eslint-disable no-new */
var GlobalVue = new Vue({
  el: '#app',
  components: { Styles, TopMenu }
})

export { GlobalVue }
