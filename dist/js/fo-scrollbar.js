(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {
  var $content = i.container.element.firstElementChild;

  var ratioY = i.ratioY;
  var railYHeight = i.railY.height;

  function clickRailY(e) {
    var originTopNumber = parseInt(dom.css(i.sliderY.element, 'top'), 10);
    var newTopNumber = e.layerY - i.sliderY.height / 2;

    if (newTopNumber < 1) return $content.scrollTop = 0;

    if (newTopNumber + i.sliderY.height > i.railY.height) newTopNumber = i.railY.height - i.sliderY.height;

    var newTop = newTopNumber.toString() + 'px';
    dom.css(i.sliderY.element, 'top', newTop);
    var journey = newTopNumber - originTopNumber;
    var scrollTop = journey / ratioY;
    $content.scrollTop += scrollTop;
  }

  event.bind(i.railY.element, 'click', clickRailY);
};

},{"../util/dom":8,"../util/event":9}],2:[function(require,module,exports){
'use strict';

var event = require('../util/event');

module.exports = function (i) {
  var currentPageY;

  event.bind(i.sliderY.element, 'mousedown', function (e) {
    currentPageY = e.pageY;
    event.bind(document, 'mousemove', mouseMoveHandler);
  });

  function mouseMoveHandler(e) {
    // console.log(e.pageY);
    // console.log(e.pageY - currentPageY);
  }
};

},{"../util/event":9}],3:[function(require,module,exports){
"use strict";

module.exports = function (i) {};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = function (i) {};

},{}],5:[function(require,module,exports){
'use strict';

var instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');

module.exports = function (element) {
  var $content = element.firstElementChild;
  if ($content.scrollHeight > $content.clientHeight) {
    var i = new instance(element);

    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
  }
};

},{"./event/click-rail":1,"./event/drag-slider":2,"./event/mouse-wheel":3,"./event/press-keyboard":4,"./instance":6}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var dom = require('./util/dom');

var Instance = (function () {
  function Instance(element) {
    _classCallCheck(this, Instance);

    var sliderWidth = 10;
    var $content = element.firstElementChild;

    var $railY = dom.createElement('<div class="fo-scrollbar-rail-y"></div>');
    dom.appendTo($railY, element);

    var $sliderY = dom.createElement('<div class="fo-scrollbar-slider-y"></div>');
    dom.appendTo($sliderY, element);

    // var paddingRight = dom.css(element, 'paddingRight');
    // var paddingRightInt = parseInt(paddingRight, 10);
    // var newPaddingRight = (paddingRightInt + sliderWidth).toString() + 'px';
    // dom.css(element, 'paddingRight', newPaddingRight);

    this.ratioX = $content.clientWidth / $content.scrollWidth;
    this.ratioY = $content.clientHeight / $content.scrollHeight;

    this.container = {
      element: element,
      width: 400,
      height: element.clientHeight
    };

    this.content = {
      width: 400,
      height: $content.scrollHeight
    };

    this.railX = {
      width: 400,
      height: ''
    };

    this.railY = {
      element: $railY,
      width: 400,
      height: $content.clientHeight
    };

    this.sliderX = {
      width: 400,
      height: ''
    };

    this.sliderY = {
      element: $sliderY,
      width: 40,
      height: parseInt(this.container.height * this.container.height / this.content.height, 10)
    };

    // setSliderXheight()
    dom.css($sliderY, 'height', this.sliderY.height + 'px');
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

},{"./util/dom":8}],7:[function(require,module,exports){
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

},{"./init":5}],8:[function(require,module,exports){
'use strict';

var dom = {};

function getCss(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function setSingleCss(element, styleName, styleValue) {
  if (typeof styleValue === 'number') styleValue = styleValue.toString() + 'px';
  element.style[styleName] = styleValue;
  return element;
}

function setMultiCss(element, obj) {
  for (var key in obj) {
    var styleValue = obj[key];
    if (typeof styleValue === 'number') styleValue = styleValue.toString() + 'px';
    element.style[styleName] = styleValue;
  }
  return element;
}

dom.createElement = function (string) {
  var element = document.createElement('div');
  element.innerHTML = string;
  return element.firstElementChild;
};

dom.appendTo = function (child, parent) {
  parent.appendChild(child);
};

dom.addClass = function (element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
  return element;
};

dom.removeClass = function (element, className) {
  var classes = element.className.split(' ');
  var index = classes.indexOf(className);
  if (indexOf > -1) {
    classes.splice(index, 1);
  }
  element.className = classes.join(' ');
  return element;
};

dom.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    return setMultiCss(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return getCss(element, styleNameOrObject);
    } else {
      return setSingleCss(element, styleNameOrObject, styleValue);
    }
  }
};

module.exports = dom;

},{}],9:[function(require,module,exports){
"use strict";

var event = {};

event.bind = function (element, name, listener) {
  element.addEventListener(name, listener, false);
};

event.unbind = function (element, name, listener) {
  element.removeEventListener(name, listener, false);
};

event.once = function (element, name, listener) {
  var that = this;
  var once = function once(e) {
    that.unbind(element, name, once);
    listener(e);
  };
  that.bind(element, name, once);
};

module.exports = event;

},{}]},{},[7]);
