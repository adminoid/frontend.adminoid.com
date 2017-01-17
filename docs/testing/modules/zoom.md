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
-   sdf
