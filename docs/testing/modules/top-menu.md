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