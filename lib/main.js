'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalVue = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Styles = require('./components/Styles');

var _Styles2 = _interopRequireDefault(_Styles);

var _TopMenu = require('./components/TopMenu');

var _TopMenu2 = _interopRequireDefault(_TopMenu);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _jquery2.default;

var pageName = $('.ui.page.container').attr('id');
var components = {};
switch (pageName) {
  case 'portfolio':
    var Zoom = require('./components/Zoom');
    components = { Styles: _Styles2.default, TopMenu: _TopMenu2.default, Zoom: Zoom };
    break;
  case 'process':
    var HalfRotate = require('./components/HalfRotate');
    components = { Styles: _Styles2.default, TopMenu: _TopMenu2.default, HalfRotate: HalfRotate };
    break;
  case 'price':
    var Clock = require('./components/Clock');
    components = { Styles: _Styles2.default, TopMenu: _TopMenu2.default, Clock: Clock };
    break;
  default:
    components = { Styles: _Styles2.default, TopMenu: _TopMenu2.default };
}

var GlobalVue = new _vue2.default({
  el: '#app',
  components: components
});

exports.GlobalVue = GlobalVue;