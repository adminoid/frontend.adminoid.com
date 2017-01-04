# Component TopMenu

## Component plan

### Events
-   on load, check offset from top
    Example:
    ```
    it('Should render correctly with a date in the future.', () => {
      const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      const vm = getComponent(tomorrow).$mount();
      expect(vm.$el).to.be.ok;
    
      // Counter should show 23:59:59
      // TimeUntilExpiration is a component method.
      expect(vm.$refs.component.timeUntilExpiration()).to.equal('23:59:59');
    
      // Priority should be normal.
      expect(vm.$refs.component.priorityLevel()).to.equal('normal');
    });
    ```
-   on scrolling, check offset from top
-   if offsetFromTop > mainMenuTopOffset run forward animation
-   if offsetFromTop < mainMenuTopOffset run backward animation

### Methods

#### Run forward animation
-   redraw solid hands of logo to two separate hangs

##### Hands animation (parallel)
-   change transform origin property
    -   left hand: right center
    -   right hand: left center
- move hands to top
    -   left hand: angle clockwise
    -   right hand: angle counterclockwise
- move hands to bottom: like above

##### Body with hands animation


---

## Пролемы
1.  Если повесить шпиона на метод, и не вызвать его непрямую, то счетчик не обновляется
2.  У импортированного компонента нет methods ```TopMenu.checkTopOffset === undefined```
3.  Если сделать ```var vm1 = new Vue(TopMenu)```, то methods появится
4.  У импортированного компонента есть created
5.  Если сделать ```var vm1 = new Vue(TopMenu)```, то created пропадает

**Решение:** sinon.spy(TopMenu.methods, 'checkTopOffset')
и потом уже все считает (и после реализации)

## Выводы
1.  Если сделать 
    ```
    var vm1 = new Vue(TopMenu)
    ```
    то created уже исполнился
    если потом сделать
    ```
    vm1.$mount()
    ```
    то created больше не выполняется и так же уже был исполнен единожды
2.  Теперь потестю что там с функцией createComponent из слайдов 
    ```
        const getComponent = (date) => {
            let vm = new Vue({
                template: '<div><final-countdown v-ref:component :date="date"></final-countdown></div>',
                components: {
                    FinalCountdown
                },
                data: {
                    date
                }
            });
            return vm;
        };
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        const vm = getComponent(tomorrow).$mount();
        expect(vm.$el).to.be.ok;
      ```
      Это позволяет создать нужную среду для компонента, обертку. Так же можно передать разные параметры и разный параметр
3.  ```$mount()```
    ```
    import TopMenu from 'src/components/TopMenu'
    var MyComponent = new Vue(TopMenu)
    // above identical to below
    var MyComponent = Vue.extend({
        template: '<div>Hello!</div>'
    })
    ```
    
4.  И еще надо понять что там было с el = div...
