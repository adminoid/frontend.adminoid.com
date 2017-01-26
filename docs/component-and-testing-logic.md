## Новые итоги
**describe** - это описание группы проверок **it**, в нем задаются:
```javascript
describe("Тест", function() {

  before(function() { alert("Начало тестов") })
  after(function() { alert("Конец тестов") })

  beforeEach(function() { alert("Вход в тест") })
  afterEach(function() { alert("Выход из теста") })

  it('тест 1', function() { alert('1') })
  it('тест 2', function() { alert('2') })

})
```
**По событиям:** <https://learn.javascript.ru/dispatch-events>

---

Запуск тестов в кастомном браузере:
```//    "unit-watch": "karma start test/unit/karma.conf.js  --browsers PhantomJS_custom",```

## Sinon.spy()
Что бы он нормально работал, надо назначать шпиона на модуль до реализации
Т.к. после реализации создается экземпляр или уже со шпионом или уже без...

## Почему не было ширины?
Потому что ширина задается стилями, от внешнего враппера к внутреннему компонента,
а в тесте есть только компонент без стилей и без враппера...

**Вывод:** В тестах компонент должен быть независим от стилей и контекста, поэтому ширины элементов задавать вручную внутри теста (подсматривая реальные разимеры с dev сервера)

Что дальше делать?

Установить размер врапперу
и бОльший размер картинке
проверить как замоунтилось и установились стартовые значения

# Из чего может состоять компонент и как это тестировать
>-   при старте
>-   на событиях
>-   тестирование отдельных методов

Если при старте или при обновлении надо взять рамеры елемента из теста - то не получается их брать - поэтому тестирую пока просто запуск методов - что прошел и пробую запускать методы с предопределенными параметрами?

[change sizes for Karma](https://github.com/karma-runner/karma/issues/438#issuecomment-46697646)
[discussion about karma window size](https://github.com/karma-runner/karma/issues/438)
[module for karma windows size and browser settings](https://github.com/karma-runner/karma-phantomjs-launcher)
как устанавливать размеры элементам:
```javascript
describe('expect wrapper width set', () => {
  var wrapper = new Vue({
    template: '<div><zoom ref="component" wrapper="#ikmed-orders"></zoom></div>',
    components: {Zoom}
  })
  wrapper.$mount()
  const accountInstance = wrapper.$children[0]
  var $wrapper = $(accountInstance.$el)
  beforeEach(function () {
    $wrapper.css('width', '5000px')
    $wrapper.trigger('click')
  })
  it('test width', () => {
    console.log($wrapper.width())
  })
})
```

Пример с событиями из <https://github.com/karma-runner/karma/issues/438#issuecomment-46697646>
```javascript
describe('when window is resized to fit content', function() {
  beforeEach(function() {
    element.css('width', '5000px');
    $(window).trigger('resize');
    scope.$digest();
  });

  it('should remove content pane preview class', function() {
    expect(element.single('.content')).not.toHaveClass('preview');
  });
});
```

## Операции при инициализации
1.  Входные параметры
2.  Параметры computed, основанные на params

### Установление props в data (со значениями по умолчанию)
```javascript
// ...
props: {
  wrapper: {
    type: String,
    default: '.wrapper'
  },
  image: {
    type: String,
    default: '.zoom'
  },
}
data: function () {
  return {
    selectors: {
      wrapper: this.wrapper,
      image: this.image
    }
  }
},
// ...
```
### Тестирование props в data (со значениями по умолчанию)
```javascript
describe('check startup setup selectors', () => {
  var wrapperWithDiffParams = new Vue({
    template: '<div><zoom ref="component" wrapper="#ikmed-orders-different" image=".zoom-different"></zoom></div>',
    components: {Zoom}
  })
  // var vmWithDiffParams = wrapperWithDiffParams.$mount()
  it('check setup wrapper selector', () => {
    expect(wrapperWithDiffParams.selectors.wrapperWidth).is.equal('#ikmed-orders-different')
  })
})
```
