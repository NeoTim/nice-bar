# nice-bar[![Build Status](https://travis-ci.org/forsigner/nice-bar.svg?branch=master)](https://travis-ci.org/forsigner/nice-bar)

A nice and lightweight scrollbar.

# Demo

[demo](http://nice-bar.mipinr.com/)

# Features

- Lightweight
- Nice looking
- Customize
- No jQuery dependency

# Install

### bower

```bash
$ bower install nice-bar --save
```

### npm

```bash
$ npm install nice-bar --save
```

# Usage

```html
<link rel="stylesheet" href="bower_components/nice-bar/dist/css/nice-bar.min.css" />
<script src="bower_components/nice-bar/dist/js/nice-bar.js"></script>

<style>
  .container {
    height: 500px; /* height is the only css property required */
    /* height: 100%; work also*/
  }
</style>

<div id="container" class="container">
  <!--content-->
</div>
```

```js
niceBar.init(document.getElementById('#container'));

```

# Browser compatibility

- IE8+
- Firefox
- Chrome
- Safari
- Opera

# Use with Angular

```
// TODO
```
