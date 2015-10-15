(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function (i) {};

},{}],2:[function(require,module,exports){
"use strict";

module.exports = function (i) {};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function (i) {};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = function (i) {};

},{}],5:[function(require,module,exports){
'use strict';

var init = require('./init');
var foScrollbar = {
  init: init,
  update: 'update'
};

if (typeof define === 'function' && define.amd) {
  define('fo-scrollbar', [], function () {
    return foScrollbar;
  });
} else {
  window.foScrollbar = foScrollbar;
}

},{"./init":6}],6:[function(require,module,exports){
'use strict';

var instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');

module.exports = function (element) {
  var i = new instance(instance);

  clickRail(i);
  dragSlider(i);
  mouseWheel(i);
  pressKeyboard(i);
};

},{"./event/click-rail":1,"./event/drag-slider":2,"./event/mouse-wheel":3,"./event/press-keyboard":4,"./instance":7}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Instance = (function () {
  function Instance(element) {
    _classCallCheck(this, Instance);

    this.container = {
      width: 400
    };

    this.content = {};

    this.rail = {};

    this.slider = {};
  }

  _createClass(Instance, [{
    key: 'toString',
    value: function toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }]);

  return Instance;
})();

module.exports = Instance;

},{}]},{},[5]);
