'use strict';

var dom = require('./util/dom');
var guid = require('./util/guid');

var instance = {
  init: function (element) {

    var $content = document.getElementById('niceBarContent');
    var $railY = createRailYElement();
    var $sliderY = createSliderYElement();

    dom.appendTo($railY, element);
    dom.appendTo($sliderY, element);

    this.sumDeltaY = 0;

    this.container = {
      element: element,
      width: element.clientWidth,
      height: element.clientHeight,
    };

    this.ing = true;

    this.content = {
      deltaY: 0, // 增量
      element: createContentElement(),
      width: $content.clientWidth,
      height: $content.scrollHeight,
      scrollTop: $content.scrollTop,
    };

    this.ratioX = this.container.width / this.content.width;
    this.ratioY = this.container.height / this.content.height;

    this.railX = { width: 400, height: '' };

    this.railY = {
      element: $railY,
      width: 400,
      height: this.container.height,
    };

    this.sliderX = { width: 400, height: '' };

    this.sliderY = {
      deltaY: 0, // 增量
      element: $sliderY,
      top: 0,
      width: 40,
      height: this.container.height * this.ratioY,
    };

    dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');

    dom.css(this.container.element, {
      overflow: 'hidden',
      position: 'relative',
    });

    dom.css(this.content.element, {
      overflow: 'hidden',
      height: this.container.height,
    });
  },

  showSliderY: function () {
    dom.addClass(this.sliderY.element, 'fade-in');
    dom.removeClass(this.sliderY.element, 'fade-out');
  },

  hideSliderY: function () {
    dom.addClass(this.sliderY.element, 'fade-out');
    dom.removeClass(this.sliderY.element, 'fade-in');
  },

};

// ////////////////////////////////////////
function createSliderYElement() {
  return dom.createElement('<div class="nice-bar-slider-y"></div>');
}

function createRailYElement() {
  return dom.createElement('<div class="nice-bar-rail-y"></div>');
}

function createContentElement() {
  var inner = element.innerHTML;
  var id = guid();
  console.log(id);
  element.innerHTML = '<div id="' + id + '"></div>';

  var $content = document.getElementById(id);
  $content.innerHTML = inner;
  return $content;
}

module.exports = instance;
