'use strict';

let dom = require('./util/dom');

class Instance {
  constructor(element) {

    function createSliderYElement() {
      return dom.createElement('<div class="va-scrollbar-slider-y"></div>');
    }

    function createRailYElement() {
      return dom.createElement('<div class="va-scrollbar-rail-y"></div>');
    }

    let $content = element.firstElementChild;
    let $railY = createRailYElement();
    let $sliderY = createSliderYElement();

    dom.appendTo($railY, element);
    dom.appendTo($sliderY, element);

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

    this.railX = {width: 400, height: ''};

    this.railY = {
      element: $railY,
      width: 400,
      height: $content.clientHeight
    };

    this.sliderX = {width: 400, height: ''};

    this.sliderY = {
      deltaY: 0, // 增量
      element: $sliderY,
      top: 0,
      width: 40,
      height: this.container.height * this.ratioY
    };

    dom.css(this.sliderY.element, 'height', this.sliderY.height + 'px');
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

module.exports = Instance;
