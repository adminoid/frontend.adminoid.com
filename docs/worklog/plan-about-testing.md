Как тестировать стили?

# Что мне вообще нужно делать по юнит тестам к vue?

Main.js моунтится на элемент

Подключается компонент Styles

Применяются стили к странице

Подключается компонент MainMenu.vue

Моунтится в инлайн шаблон #main-menu

При прокрутке страницы вниз на nn пикселей - отслеживается уровень nn Если больше - то одно, если меньше - то другое
<http://stackoverflow.com/questions/39372354/nightwatch-js-scroll-until-element-is-visible>

Можно поставить свойство topDistance в нужное значение и посмотреть запустилась ли функция

Надо выяснить:

как тестить свойства
как тестить методы
как что еще можно тестить

<http://www.slideshare.net/coulix/vuejs-testing>
<http://stackoverflow.com/questions/35280931/testing-vue-js-component>
<https://vuejs-templates.github.io/webpack/unit.html>

<https://vuejs-templates.github.io/webpack/prerender.html>
<https://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html>

[Nightwatchjs](http://nightwatchjs.org/guide#writing-tests)
[Mocha.js](https://mochajs.org/)

---
[Best article](http://tyronetudehope.com/2016/11/24/vue-js-vuex-testing-an-introduction/)

# День второй
[Примеры тестов для Vue](https://github.com/kmees/karma-sinon-chai)

## vue-loader
[Testing with Mocks](https://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html)
[Testing](https://vue-loader.vuejs.org/en/workflow/testing.html)

## Webpack vue template
[Unit Testing](http://vuejs-templates.github.io/webpack/unit.html)
[End-to-end Testing](http://vuejs-templates.github.io/webpack/e2e.html)

## Другое
[Слайды](http://www.slideshare.net/coulix/vuejs-testing)
