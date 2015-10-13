'use strict';

let init = require('./init');
let foScrollbar = {
  init: init,
  update: 'update'
};

if (typeof define === 'function' && define.amd) {
  define('fo-scrollbar', [], function() {
    return foScrollbar;
  });
} else {
  window.foScrollbar = foScrollbar;
}
