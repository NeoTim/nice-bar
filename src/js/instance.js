let dom = require('./util/dom');

class Instance {
  constructor(element) {
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

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}


module.exports = Instance;
