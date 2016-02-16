'use strict';

var niceBar = require('./main');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof window === 'object') {
    window.niceBar = factory();
  }
}(function () {

  return niceBar;
}));
