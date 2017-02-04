# Clear frontend Vue.js (webpack) + Semantic UI

Official documentation about this template: [http://vuejs-templates.github.io/webpack/](http://vuejs-templates.github.io/webpack/)

## Install Vue.js (webpack) and make that file
```shell
vue init webpack frontend.adminoid.com
cd frontend.adminoid.com
npm install
npm run dev
```

```
mkdir docs && cd docs && sudo vi install.md
```

## Git repo
```shell
git init
git add .
git commit -m "First commit with installed Vue.js"
```

## Install Semantic UI
```shell
npm install semantic-ui --save
cd semantic
gulp build
```

If gulp is not installed
```shell
npm install -g gulp
gulp build
```

## Include Semantic UI to index.html
**All file auto inserted by webpack**
So code below is wrong:
>
```html
...
    <!-- built files will be auto injected -->
-    <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css">
-    <script src="semantic/dist/semantic.min.js"></script>
  </body>
```


## Run server
In root folder of project
```shell
npm install
npm run dev
```
> Look in [/README.md](/README.md)

Open in browser: [http://localhost:8080/](http://localhost:8080/)
> Static files for dev in ```/static``` folder and sub-folders

## add semantic styles to Vue
In file ```src/App.vue```:
```html
<style>
+  @import '../semantic/dist/semantic.min.css';

  #app {
```

## add semantic js to Vue
In file ```src/main.js``` (before other imports)
```js
import '../node_modules/semantic-ui/dist/semantic.min.js'
```

## Install jQuery

[http://stackoverflow.com/questions/37928998/how-to-use-a-jquery-plugin-inside-vue](http://stackoverflow.com/questions/37928998/how-to-use-a-jquery-plugin-inside-vue)

```shell
npm i jquery --save-dev
```

In file ```build/webpack.prod.conf.js```:
```
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    
// below new lines:
+    new webpack.ProvidePlugin({
+      $: 'jquery',
+      jquery: 'jquery',
+      'window.jQuery': 'jquery',
+      jQuery: 'jquery'
+    }),
```

In file ```build/webpack.dev.conf.js```:
```
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
+    new webpack.ProvidePlugin({
+      $: 'jquery',
+      jquery: 'jquery',
+      'window.jQuery': 'jquery',
+      jQuery: 'jquery'
+    }),
```

In file ```.eslintrc.js```
```
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
+  "globals": {
+    "$": true,
+    "jQuery": true
+  }
```

## If has errors eslint in included files
add line in file begin:
```javascript
/* eslint-disable */
```

### Links list
_About webpack stuff_
[http://vuejs-templates.github.io/webpack/](http://vuejs-templates.github.io/webpack/)
[https://vue-loader.vuejs.org/en/](https://vue-loader.vuejs.org/en/)
_About code splitting_
<https://vuejs.org/v2/guide/ssr.html>
<https://webpack.github.io/docs/code-splitting.html>
<https://github.com/chrisvfritz/prerender-spa-plugin>
