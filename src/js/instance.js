'use strict';

var dom = require('./util/dom');

function Instance(element) {

  // var $content = element.firstElementChild;
  var $content = document.getElementById('niceBarContent');
  var $railY = createRailYElement();
  var $sliderY = createSliderYElement();

  dom.appendTo($railY, element);
  dom.appendTo($sliderY, element);

  this.sumDeltaY = 0;

  this.container = {
    element: element,
    width: element.clientWidth,
    height: element.clientHeight
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
    height: this.container.height
  };

  this.sliderX = { width: 400, height: '' };

  this.sliderY = {
    deltaY: 0, // 增量
    element: $sliderY,
    top: 0,
    width: 40,
    height: this.container.height * this.ratioY
  };

  dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');

  dom.css(this.container.element, 'overflow', 'hidden');
  dom.css(this.container.element, 'position', 'relative');

  dom.css(this.content.element, 'overflow', 'hidden');
  dom.css(this.content.element, 'height', this.container.height);

  ////////////////////////////////////////////

  function createSliderYElement() {
    return dom.createElement('<div class="nice-bar-slider-y"></div>');
  }

  function createRailYElement() {
    return dom.createElement('<div class="nice-bar-rail-y"></div>');
  }

}

module.exports = Instance;
