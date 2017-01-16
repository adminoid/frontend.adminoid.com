# What is the plan?

## Logotype animation  
+   create checkTopOffset() method (puts current offset to $data.topOffset)
+   run checkTopOffset() when mounted
+   add event listener on scroll, bind it to checkTopOffset() method
+   timeline is created and put to $data
+   make runLogoAnimation method
+   add watcher on topOffset for running runLogoAnimation
-   if topOffset was < but now has > settings.topOffsetForToggleAnimation run this.timeline.play()
-   if topOffset was > but now has < settings.topOffsetForToggleAnimation run this.timeline.reverse(0)

# Open sidebar
to be continued...