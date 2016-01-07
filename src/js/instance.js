'use strict';

var dom = require('./util/dom');

function Instance(element) {

  function createSliderYElement() {
    return dom.createElement('<div class="nice-bar-slider-y"></div>');
  }

  function createRailYElement() {
    return dom.createElement('<div class="nice-bar-rail-y"></div>');
  }

  var $content = element.firstElementChild;
  var $railY = createRailYElement();
  var $sliderY = createSliderYElement();

  dom.appendTo($railY, element);
  dom.appendTo($sliderY, element);

  this.sumDeltaY = 0;

  this.container = {
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

  dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');

}

Instance.prototype.toString = function() {
  return '(' + this.x + ', ' + this.y + ')';
};

module.exports = Instance;
