# Information about component testing
 
## Methods for make component object

```javascript
import Vue from 'vue';
import FinalCountdown from 'src/components/workflow/FinalCountdown';

describe('workflow/FinalCountdown component.', () => {
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

  // NEXT EXAMPLES ADD HERE! <-----

});
```