'use strict';

var dom = require('./util/dom');

function Instance(element) {

  var $content = element.firstElementChild;
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

  console.log(this.ratioY); //0.25460829493087556

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

  ////////////////////////////////////////////

  function createSliderYElement() {
    return dom.createElement('<div class="nice-bar-slider-y"></div>');
  }

  function createRailYElement() {
    return dom.createElement('<div class="nice-bar-rail-y"></div>');
  }

}

module.exports = Instance;
