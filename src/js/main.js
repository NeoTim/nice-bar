'use strict';

import init from './init';

let niceBar = {
  init: init,
  update: 'update'
};

if (typeof define === 'function' && define.amd) {
  define('niceBar', [], function() {
    return niceBar;
  });
} else {
  window.niceBar = niceBar;
}
