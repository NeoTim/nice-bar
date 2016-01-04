'use strict';

import init from './init';

let niceBar = {init: init};

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof window === 'object') {
    window.niceBar = factory();
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
}(function() {

  return niceBar;
}));
