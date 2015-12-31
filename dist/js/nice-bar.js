(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (i) {

  /**
   * get slider's new top
   * @param  {number} offsetY  a property from mouseEvent
   * @return {number} newTop slider's new top
   */
  function getNewTop(offsetY) {
    var newTop = undefined;

    if (offsetY < i.sliderY.height / 2) {
      newTop = 0;
    } else if (offsetY > i.railY.height - i.sliderY.height / 2) {
      newTop = i.railY.height - i.sliderY.height;
    } else {
      newTop = offsetY - i.sliderY.height / 2;
    }

    return newTop;
  }

  /**
   * update content box scrollTop
   * @param  {number} newTop      slider's newTop
   * @param  {number} originTop   slider's originTop
   * @return null
   */
  function updateContent(newTop, originTop) {
    var journey = newTop - originTop;
    var scrollTop = journey / i.ratioY;
    i.content.element.scrollTop += scrollTop;
    i.sumDeltaY = i.content.element.scrollTop;
  }

  /**
   * update slider's css top
   * @param  {number} newTop slider's new top
   * @return null
   */
  function updateSlider(newTop) {
    _dom2.default.css(i.sliderY.element, 'top', newTop);
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  /**
   * clickRailYHandler
   * @param  {object} e  evnet
   * @return null
   */
  function clickRailYHandler(e) {
    var originTop = _dom2.default.css(i.sliderY.element, 'top');
    var newTop = getNewTop(e.offsetY);

    updateSlider(newTop);
    updateContent(newTop, originTop);

    e.preventDefault();
  }

  _event2.default.bind(i.railY.element, 'click', clickRailYHandler);
};

var _event = require('../util/event');

var _event2 = _interopRequireDefault(_event);

var _dom = require('../util/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

},{"../util/dom":8,"../util/event":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (i) {
  var originPageY = undefined;
  var originTop = undefined;
  var originScrollTop = undefined;
  var differenceHeight = i.railY.height - i.sliderY.height;
  var ratioY = i.ratioY;

  _event2.default.bind(i.sliderY.element, 'mousedown', function (e) {
    originPageY = e.pageY;
    originTop = _dom2.default.css(i.sliderY.element, 'top');
    originScrollTop = i.content.element.scrollTop;

    _event2.default.bind(document, 'mousemove', mouseMoveHandler);
    _event2.default.once(document, 'mouseup', mouseUpHandler);
  });

  /**
   * mouseMoveHandler
   * @param  {object} e event
   * @return null
   */
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
    _dom2.default.css(i.sliderY.element, 'top', newTop);

    // udpate content
    var journey = newTop - originTop;
    var newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop;
    i.content.element.scrollTop = newScrollTop;
    i.sumDeltaY = i.content.element.scrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    _event2.default.unbind(document, 'mousemove', mouseMoveHandler);
  }
};

var _event = require('../util/event');

var _event2 = _interopRequireDefault(_event);

var _dom = require('../util/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

},{"../util/dom":8,"../util/event":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (i) {

  function mouseWheelHandler(e) {
    // update slider
    i.sumDeltaY += e.deltaY;
    var newTop = 0;

    if (i.sumDeltaY * i.ratioY < 0) {
      newTop = 0;
      i.sliderY.deltaY = 0;
      i.sumDeltaY = 0;
    } else if (i.sumDeltaY * i.ratioY > i.railY.height - i.sliderY.height) {
      newTop = i.railY.height - i.sliderY.height;
      i.sumDeltaY = i.content.element.scrollHeight - i.content.element.clientHeight;
    } else {
      newTop = i.sumDeltaY * i.ratioY;
    }

    _dom2.default.css(i.sliderY.element, 'top', newTop);

    // update box
    var newScrollTop = 0;
    newScrollTop += i.sumDeltaY;
    i.content.element.scrollTop = newScrollTop;

    // i.content.element.scrollTop = i.content.element.scrollTop +  i.sumDeltaY;

    e.preventDefault();
    e.stopPropagation();
  }

  _event2.default.bind(i.content.element, 'wheel', mouseWheelHandler);
};

var _event = require('../util/event');

var _event2 = _interopRequireDefault(_event);

var _dom = require('../util/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

},{"../util/dom":8,"../util/event":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (i) {
  // todo
};

;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element) {
  var $content = element.firstElementChild;
  if ($content.scrollHeight > $content.clientHeight) {
    var i = new _instance2.default(element);

    (0, _clickRail2.default)(i);
    (0, _dragSlider2.default)(i);
    (0, _mouseWheel2.default)(i);
    (0, _pressKeyboard2.default)(i);
  }
};

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

var _clickRail = require('./event/click-rail');

var _clickRail2 = _interopRequireDefault(_clickRail);

var _dragSlider = require('./event/drag-slider');

var _dragSlider2 = _interopRequireDefault(_dragSlider);

var _mouseWheel = require('./event/mouse-wheel');

var _mouseWheel2 = _interopRequireDefault(_mouseWheel);

var _pressKeyboard = require('./event/press-keyboard');

var _pressKeyboard2 = _interopRequireDefault(_pressKeyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

},{"./event/click-rail":1,"./event/drag-slider":2,"./event/mouse-wheel":3,"./event/press-keyboard":4,"./instance":6}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('./util/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instance = (function () {
  function Instance(element) {
    _classCallCheck(this, Instance);

    function createSliderYElement() {
      return _dom2.default.createElement('<div class="nice-bar-slider-y"></div>');
    }

    function createRailYElement() {
      return _dom2.default.createElement('<div class="nice-bar-rail-y"></div>');
    }

    var $content = element.firstElementChild;
    var $railY = createRailYElement();
    var $sliderY = createSliderYElement();

    _dom2.default.appendTo($railY, element);
    _dom2.default.appendTo($sliderY, element);

    this.sumDeltaY = 0;

    this.container = {
      width: $content.clientWidth,
      height: $content.clientHeight
    };

    this.content = {
      deltaY: 0, // 增量
      element: $content,
      width: $content.clientWidth,
      height: $content.scrollHeight,
      scrollTop: $content.scrollTop
    };

    this.ratioX = this.container.width / this.content.width;
    this.ratioY = this.container.height / this.content.height;

    this.railX = { width: 400, height: '' };

    this.railY = {
      element: $railY,
      width: 400,
      height: $content.clientHeight
    };

    this.sliderX = { width: 400, height: '' };

    this.sliderY = {
      deltaY: 0, // 增量
      element: $sliderY,
      top: 0,
      width: 40,
      height: this.container.height * this.ratioY
    };

    _dom2.default.css(this.sliderY.element, 'height', this.sliderY.height + 'px');
  }

  _createClass(Instance, [{
    key: 'toString',
    value: function toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }]);

  return Instance;
})();

exports.default = Instance;

},{"./util/dom":8}],7:[function(require,module,exports){
'use strict';

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vaScrollbar = {
  init: _init2.default,
  update: 'update'
};

if (typeof define === 'function' && define.amd) {
  define('nice-bar', [], function () {
    return vaScrollbar;
  });
} else {
  window.vaScrollbar = vaScrollbar;
}

},{"./init":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function getCss(element, styleName) {
  var styleValue = window.getComputedStyle(element)[styleName];
  if (parseInt(styleValue, 10) || parseInt(styleValue, 10) === 0) {
    styleValue = parseInt(styleValue, 10);
  }

  return styleValue;
}

function setSingleCss(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }

  element.style[styleName] = styleValue;
  return element;
}

function setMultiCss(element, obj) {
  for (var key in obj) {
    var styleValue = obj[key];
    if (typeof styleValue === 'number') {
      styleValue = styleValue.toString() + 'px';
    }

    element.style[styleName] = styleValue;
  }

  return element;
}

var dom = {
  createElement: function createElement(string) {
    var element = document.createElement('div');
    element.innerHTML = string;
    return element.firstElementChild;
  },
  appendTo: function appendTo(child, parent) {
    parent.appendChild(child);
  },
  addClass: function addClass(element, className) {
    var classes = element.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
    }

    element.className = classes.join(' ');
    return element;
  },
  removeClass: function removeClass(element, className) {
    var classes = element.className.split(' ');
    var index = classes.indexOf(className);
    if (indexOf > -1) {
      classes.splice(index, 1);
    }

    element.className = classes.join(' ');
    return element;
  },
  css: function css(element, styleNameOrObject, styleValue) {
    if ((typeof styleNameOrObject === 'undefined' ? 'undefined' : _typeof(styleNameOrObject)) === 'object') {
      return setMultiCss(element, styleNameOrObject);
    } else {
      if (typeof styleValue === 'undefined') {
        return getCss(element, styleNameOrObject);
      } else {
        return setSingleCss(element, styleNameOrObject, styleValue);
      }
    }
  }
};

exports.default = dom;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var event = {
  bind: function bind(element, name, listener) {
    element.addEventListener(name, listener, false);
  },
  unbind: function unbind(element, name, listener) {
    element.removeEventListener(name, listener, false);
  },
  once: function once(element, name, listener) {
    var that = this;
    var once = function once(e) {
      that.unbind(element, name, once);
      listener(e);
    };

    that.bind(element, name, once);
  }
};

exports.default = event;

},{}]},{},[7]);
