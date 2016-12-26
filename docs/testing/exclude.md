# When start unit tests, I look many errors. To fix that I excluded folders. Look below...

## build/webpack.base.conf.js
Instead ```exclude: /node_modules/```
```
exclude: [
    path.resolve(__dirname, '../src/semantic'),
    path.resolve(__dirname, '../node_modules'),
]
```

## .babelrc
Add
```
"ignore": [
    "src/semantic/**/*.js",
    "node_modules"
]
```
to end of file

## .eslintignore
Add lines to end of file
```
src/semantic
node_modules
semantic
```
