# Examples from slides
[From here](http://www.slideshare.net/coulix/vuejs-testing)

## Slide 3
Testing a filter
```javascript
import { prettybytes } from 'src/filters';

describe('Filter "prettybytes".', () => {
  it('Prettybytes shows the right KB, MB, GB, TB unit.', () => {
    expect(prettybytes(1024)).to.equal('1 KB');
    expect(prettybytes(1048576)).to.equal('1 MB');
    expect(prettybytes(1048576*1024))to.equal('1 GB');
    expect(prettybytes(1048576*1048576))to.equal('1 TB');
    expect(prettybytes(230))to.equal('230 bytes');
  });
});
```

## Slide 4
Testing an API call, mocking fetch.
```javascript
import { authentify } from 'src/store/actions/auth';

import fetchMock from 'fetch-mock';
import { fetchUserToken } from 'src/api/web';

describe('Authentify action', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    fetchMock.restore();
  });

  it('FetchUserToken should eventually resolve with a token.', () => {
    fetchMock.mock('/login/getaccesstoken/', { Model: '😻 ' });
    return fetchUserToken().should.eventually.equal('😻 ');
  });
});
```

## Slide 5
Testing a component (1/2).
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

  // ...

});
```

## Slide 6
Testing a component (2/2).
```javascript
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

## Slide 5 + slide 6. Merged code
Testing a component
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

## Slide 7
Testing a component property change.
```javascript
it('Should be valid only when a radio option is selected.', () => {
  const vm = getComponent('Bob').$mount();
  const component = vm.$refs.component;
  expect(component.isFormValid).to.be.false;

  component.picked = 3;
  component.$nextTick(() => {
    expect(component.isFormValid).to.be.true;
  });
});
```

## Slide 8
Testing a component event.
```javascript
it('Send should dispatch "declinedWorkflowTask" with the choice payload.', () => {
  const vm = getComponent('Bob').$mount();
  const component = vm.$refs.component;

  let spy = sinon.spy();
  vm.$on('declinedWorkflowTask', spy);

  component.sendReply();

  expect(spy).to.have.been.calledWith({
    choice: null,
    text: ''
  });
});
```

## Slide 9
Testing a component ready() hook.
```javascript
it('Should focus on textarea when ready.', (done) => {
  const vm = getComponent();
  const component = vm.$refs.component;

  // Action triggered by Message Template child component.
  fetchMock.mock('/tutor/templates', [{ title: 'template A', body: 'AAA' },
                                      { title: 'template B', body: 'BBB' }]);
  // Triggers ready() on our component
  vm.$appendTo(document.body);

  component.$nextTick(() => {
    expect(document.activeElement).to.equal(component.$els.textarea);
    done();
  })
});
```

## Slide 10
Testing with a Vuex store
```javascript
import store from 'src/store';

describe('workflow/WorkflowAccept component.', () => {
  // Update store states here or import from fixtures.
  store.state.availability = { ... };

  const getComponent = () => {
    let vm = new Vue({
      template: '<div><workflow-accept v-ref:component></workflow-accept></div>',
      components: {
        WorkflowAccept
      },
      // Inject store here.
      store: store
    });

    return vm.$mount();
  };

});
```

## Slide 11
Testing a Vuex action (1/2).
```javascript
import { sendInitialDirectContactResponse } from 'src/store/actions/workflow';
import store from 'src/store';
const state = store.state;
import { TestAction } from './helper';

describe('sendInitialDirectContactResponse action.', () => {
  beforeEach(() => {
    state.workflow.workflowTask = {
      id: 1,
      conversationThread: {
        id: 2,
      },
      initialDirectContact: {
        id: 3,
      },
    };
    // ...
  });
});
```

## Slide 12
Testing a Vuex action (2/2).
```javascript
it('Should dispatch the right mutations.', (done) => {
  testAction(sendInitialDirectContactResponse, [1, 1, 'test'], state, [
    { name: 'DELETE_WORKFLOW_TASK', payload: [1] },
    { name: 'ADD_CONVERSATION_THREAD_TO_TOP' },
    { name: 'UPDATE_CONVERSATION_THREAD' },
  ], done);
});

it('Should not dispatch ADD_CONVERSATION_THREAD_TO_TOP if ...', (done) => {
  state.app.menuSelecion = 'archived';

  testAction(sendInitialDirectContactResponse, [1, 1, 'test'], state, [
    { name: 'DELETE_WORKFLOW_TASK', payload: [1] },
  ], done);
});
```

## Slide 13
Testing a Vuex action - testaction.js (1/2).
```javascript
// Helper for testing action with expected mutations.
export function testAction(action, args, state, expectedMutations, done) {
  let count = 0;

  // mock dispatch
  const dispatch = (name, ...payload) => {
    const mutation = expectedMutations[count];
    expect(mutation.name).to.equal(name)

    // if our mutation has a payload and our expected mutation
    // wants us to assert this payload.
    if (payload && mutation.payload) {
      expect(mutation.payload).to.deep.equal(payload);
    }

    count++;
    if (count === expectedMutations.length) {
      done();
    }
  }
}
```

## Slide 14
Testing a Vuex action - testaction.js (2/2).
```javascript
    // ...
    if (count > expectedMutations.length) {
      // Missing non expected mutations.
      // List all expected mutations!
      expect(count).to.equal(expectedMutations.length);
    }
  }

  // call the action with mocked store and arguments
  action({ dispatch, state }, ...args);

  // check if no mutations should have been dispatched
  if (count === 0) {
    expect(expectedMutations.length).to.equal(0);
    done();
  }
};
```
