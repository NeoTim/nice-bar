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

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

module.exports = Instance;
