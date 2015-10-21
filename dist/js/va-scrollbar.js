(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {

  function getNewTop(layerY) {
    var newTop = layerY - i.sliderY.height / 2;
    if (newTop < 0) {
      newTop = 0;
    } else if (newTop + i.sliderY.height > i.railY.height) {
      newTop = i.railY.height - i.sliderY.height;
    }
    return newTop;
  }

  function updateBox(newTop, originTop) {
    var journey = newTop - originTop;
    var scrollTop = journey / i.ratioY;
    i.box.element.scrollTop += scrollTop;
  }

  function updateSlider(newTop) {
    dom.css(i.sliderY.element, 'top', newTop);
  }

  function updateSliderYGeometry(newTop) {
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  function clickRailY(e) {
    var originTop = dom.css(i.sliderY.element, 'top');
    var newTop = getNewTop(e.layerY);
    updateSlider(newTop);
    updateBox(newTop, originTop);
    updateSliderYGeometry(newTop);
    e.preventDefault();
  }

  event.bind(i.railY.element, 'click', clickRailY);
};

},{"../util/dom":8,"../util/event":9}],2:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {
  var originPageY = undefined;
  var originTop = undefined;
  var originScrollTop = undefined;
  var differenceHeight = i.railY.height - i.sliderY.height;
  var ratioY = i.ratioY;

  event.bind(i.sliderY.element, 'mousedown', function (e) {
    originPageY = e.pageY;
    originTop = dom.css(i.sliderY.element, 'top');
    originScrollTop = i.box.element.scrollTop;

    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);
  });

  function mouseMoveHandler(e) {

    i.sliderY.deltaY = 0;

    // update slider
    var newTop = e.pageY - originPageY + originTop;

    if (newTop <= 0) {
      newTop = 0;
    } else if (newTop >= differenceHeight) {
      newTop = differenceHeight;
    }

    i.sliderY.top = newTop;
    dom.css(i.sliderY.element, 'top', newTop);

    // udpate box
    var journey = newTop - originTop;
    var newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop;
    i.box.element.scrollTop = newScrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    // console.log(2222);
    // todo
    event.unbind(document, 'mousemove', mouseMoveHandler);
  }
};

},{"../util/dom":8,"../util/event":9}],3:[function(require,module,exports){
'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function (i) {
  var differenceHeight = i.railY.height - i.sliderY.height;

  event.bind(i.box.element, 'wheel', mouseWheelHandler);

  function mouseWheelHandler(e) {

    // update slider
    i.sliderY.deltaY += e.deltaY;
    var newTop = i.sliderY.top + i.sliderY.deltaY * i.ratioY;

    if (newTop < 0) {
      newTop = 0;
      i.sliderY.top = 0;
      i.sliderY.deltaY = 0;
    }

    if (newTop > differenceHeight) {
      newTop = differenceHeight;
      i.sliderY.deltaY = i.box.element.scrollHeight - i.box.element.clientHeight;
      i.sliderY.top = 0;
    }

    dom.css(i.sliderY.element, 'top', newTop);

    //update box
    var newScrollTop = 0;
    newScrollTop += i.sliderY.deltaY;
    i.box.element.scrollTop = newScrollTop;

    e.preventDefault();
    e.stopPropagation();
  }
};

},{"../util/dom":8,"../util/event":9}],4:[function(require,module,exports){
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

    function createSliderYElement() {
      return dom.createElement('<div class="va-scrollbar-slider-y"></div>');
    }

    function createRailYElement() {
      return dom.createElement('<div class="va-scrollbar-rail-y"></div>');
    }

    var $content = element.firstElementChild;
    var $railY = createRailYElement();
    var $sliderY = createSliderYElement();
    dom.appendTo($railY, element);

    dom.appendTo($sliderY, element);

    this.ratioX = $content.clientWidth / $content.scrollWidth;
    this.ratioY = $content.clientHeight / $content.scrollHeight;

    this.box = {
      element: $content,
      width: $content.clientWidth,
      height: $content.clientHeight,
      contentHeight: $content.scrollHeight,
      containerHeight: $content.clientHeight,
      d: ''
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
      deltaY: 0,
      element: $sliderY,
      top: 0,
      width: 40,
      height: this.box.containerHeight * this.box.containerHeight / this.box.contentHeight
    };

    dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');
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
var vaScrollbar = {
  init: init,
  update: 'update'
};

if (typeof define === 'function' && define.amd) {
  define('va-scrollbar', [], function () {
    return vaScrollbar;
  });
} else {
  window.vaScrollbar = vaScrollbar;
}

},{"./init":5}],8:[function(require,module,exports){
'use strict';

var dom = {};

function getCss(element, styleName) {
  var styleValue = window.getComputedStyle(element)[styleName];
  if (parseInt(styleValue, 10) || parseInt(styleValue, 10) === 0) {
    styleValue = parseInt(styleValue, 10);
  }
  return styleValue;
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
