# Component Zoom
~~base in Portfolio page~~
## Component plan
**What that component is must to do?**
Must have 2 elements: wrapper and image
When mouseover event on wrapper - must change scale 1:1 and make left and top offset for position:absolute
<https://codepen.io/ccrch/pen/yyaraz>
<http://htmlbook.ru/css/background-position>

## Trigger event with coordinates for unit testing
```javascript
// create a jQuery event
e = $.Event('mousemove');

// set coordinates
e.pageX = 100;
e.pageY = 100;

// trigger event - must trigger on document
$(document).trigger(e);
```

## Unit testing plan
-   check for params wrapper, image, startX, startY are passed
-   when start calculate params width, height (and may be proportions) of wrapper and image
-   when start calculate proportions by x and y axis (horizontalProportion=imgWidth/wrapperWidth, imgHeight/wrapperHeight)
-   on mousemove make watcher
    -   dynamic change leftCursorOffset and topCursorOffset
-   make computed property leftImageOffset and topImageOffset
    > leftImageOffset=leftCursorOffset\*horizontalProportion, topImageOffset=topCursorOffset\*verticalProportion

## Plan about zooming
-   when start calculate scale
    -   select max proportion and set as scale
-   when mouseover set scale to 1
-   when mousemove computed css transform-origin:
    ```
    ((e.pageX - this.offset.left)/this.width)*100
    ((e.pageY - this.offset.top)/this.height)*100
    ```
---

## What is going on mouse events?

### When load script
set up start left and top css props
startLeft and startTop get from params and if it is not exist get its from css

### When startZoom and onZoom
change left and top positions of image

### When stopZoom
return positions to start left and top values

realLeftPosition = normalLeftPosition - (left + padding)
realTopPosition = normalTopPosition - (left + padding)

## Apply rest to left and top
Get percent of cursor on wrapper and apply that percent to size of wrapper and add that size to left or top
