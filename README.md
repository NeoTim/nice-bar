# nice-bar [![Build Status](https://travis-ci.org/forsigner/nice-bar.svg?branch=master)](https://travis-ci.org/forsigner/nice-bar) [![NPM Version](http://img.shields.io/npm/v/nice-bar.svg?style=flat)](https://www.npmjs.org/package/nice-bar)

A nice and lightweight scrollbar.

## Demo

[demo](http://forsigner.com/nice-bar)

## Features

- Lightweight
- Nice looking
- Customize
- No jQuery dependency

## Install

### bower

```bash
$ bower install nice-bar --save
```

### npm

```bash
$ npm install nice-bar --save
```

## Usage

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
niceBar.init({
  element: document.getElementById('#container'),
  theme: 'dark'
});
```

#### Custom theme

You can custom scrollbar style with CSS easily:

``` CSS
.nice-bar .nice-bar-slider-y {
  background: #222;
  /* whatever */
}
```

## Browser compatibility

- IE8+
- Firefox
- Chrome
- Safari
- Opera
