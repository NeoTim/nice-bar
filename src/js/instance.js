'use strict';

var dom = require('./util/dom');
var guid = require('./util/guid');

var instance = {
  init: function (element, options) {
    if (options) {
      options = { theme: options.theme || 'light' };
    } else {
      options = { theme: 'light' };
    }

    var $content = createContentElement(element);
    var $railY = createRailYElement();
    var $sliderY = createSliderYElement();

    setTheme(element, options);

    dom.appendTo($railY, element);
    dom.appendTo($sliderY, element);

    this.sumDeltaY = 0;

    this.container = {
      element: element,
      width: element.clientWidth,
      height: element.clientHeight
    };

    this.ing = true;

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
      height: this.container.height
    };

    this.sliderX = { width: 400, height: '' };

    this.sliderY = {
      deltaY: 0, // 增量
      element: $sliderY,
      top: 0,
      width: 40,
      height: this.container.height * this.ratioY,
      isDragging: false
    };

    dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');

    dom.css(this.container.element, {
      overflow: 'hidden',
      position: 'relative'
    });

    dom.css(this.content.element, {
      overflow: 'hidden',
      height: this.container.height
    });
  },

  showSliderY: function () {
    dom.addClass(this.sliderY.element, 'fade-in');
    dom.removeClass(this.sliderY.element, 'fade-out');
  },

  hideSliderY: function () {
    dom.addClass(this.sliderY.element, 'fade-out');
    dom.removeClass(this.sliderY.element, 'fade-in');
  }

};

// ////////////////////////////////////////
function setTheme(element, optopns) {
  dom.addClass(element, 'theme-' +  optopns.theme);
  dom.addClass(element, 'nice-bar');
}

function createSliderYElement() {
  return dom.createElement('<div class="nice-bar-slider-y"></div>');
}

function createRailYElement() {
  return dom.createElement('<div class="nice-bar-rail-y"></div>');
}

function createContentElement(element) {
  var inner = element.innerHTML;
  var id = guid();
  element.innerHTML = '<div id="' + id + '"></div>';

  var $content = document.getElementById(id);
  $content.innerHTML = inner;
  return $content;
}

module.exports = instance;
