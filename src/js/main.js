'use strict';

import init from './init';

let vaScrollbar = {
  init: init,
  update: 'update'
};

if (typeof define === 'function' && define.amd) {
  define('nice-bar', [], function() {
    return vaScrollbar;
  });
} else {
  window.vaScrollbar = vaScrollbar;
}
