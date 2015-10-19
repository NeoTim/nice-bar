let dom = require('./util/dom');

class Instance {
  constructor(element) {
    var $railY = dom.createElement('<div class="fo-scrollbar-rail-y"></div>');
    dom.appendTo($railY, element);

    var $sliderY = dom.createElement('<div class="fo-scrollbar-slider-y"></div>');
    dom.appendTo($sliderY, element);


    this.container = {
      width: 400,
      height: element.clientHeight
    };

    this.content = {
      width: 400,
      height: element.scrollHeight
    };

    this.railX = {
      width: 400,
      height: ''
    };

    this.railY = {
      width: 400,
      height: 1000
    };

    this.sliderX = {
      width: 400,
      height: ''
    };

    this.sliderY = {
      width: 400,
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
