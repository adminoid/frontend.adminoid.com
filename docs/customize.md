# Customize theme for adminoid.com

## Start processes
```shell
npm install semantic-ui --save-dev
npm run dev
cd semantic
gulp build
gulp build-css
```

In file ```package.json```
Make semantic-ui without arrow

Information about semantic files placement
> After install, there are src distribution location:
> ```semantic/```
All source file placements compiles into one folder ```semantic/dist/```

## Global site settings files
1) ```semantic/src/themes/default/globals/site.variables```
2) ```semantic/src/themes/default/globals/site.overrides```

## Pages styles
Into path ```semantic/src/themes/default/pages```

## Modules

### 1
Copy folder ```semantic/src/themes/default/helpers```
> ```semantic/src/themes/default/helpers/visibility.less``` _new folder helpers with one file visibility.less_

### 2 
```
semantic/src/themes/default/collections/menu.overrides // перенести в файлы страниц 
semantic/src/themes/default/collections/menu.variables // перенести в файлы страниц
semantic/src/themes/default/elements/label.variables // перенести в файлы страниц
semantic/src/themes/default/elements/segment.variables // перенести в файлы страниц
semantic/src/themes/default/elements/button.overrides // перенести в файлы страниц
semantic/src/themes/default/views/card.overrides // перенести в файлы страниц
semantic/src/themes/default/views/card.variables // перенести в файлы страниц
reestablish!!! semantic/src/definitions/elements/label.less
reestablish!!! semantic/src/definitions/views/card.less
```

## Replace _img_ to _static/img_ in page styles
```
semantic/src/themes/default/pages/price.less
```

## Move static images
```
static/img
```

## Clear default Vue #app styles
```src/App.vue```
> Remove in style tag

## Eslint errors fixing
In file ```semantic/dist/components/sidebar.min.js```
add to top: 
```javascript
/* eslint-disable */
```

## If preserveComments errors
comment all preserveComments strings in file: ```semantic/tasks/config/tasks.js```

