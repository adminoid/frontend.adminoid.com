# What is the plan?

## Logotype animation  
-   create checkTopOffset() method (puts to $data.topOffset)
-   run checkTopOffset()
-   add event listener on scroll, bind it to checkTopOffset() method
-   timeline is created and put to $data
-   add watcher on topOffset
-   if topOffset was < but now has > settings.topOffsetForToggleAnimation run this.timeline.play()
-   if topOffset was > but now has < settings.topOffsetForToggleAnimation run this.timeline.reverse(0)

# Open sidebar
to be continued...