let dom = require('./util/dom');

class Instance {
  constructor(element) {
    var $content = element.firstElementChild;
    console.log($content.scrollHeight);
    console.log($content.clientHeight);

    if ($content.scrollHeight > $content.clientHeight) {
      var $railY = dom.createElement('<div class="fo-scrollbar-rail-y"></div>');
      dom.appendTo($railY, element);

      var $sliderY = dom.createElement('<div class="fo-scrollbar-slider-y"></div>');
      dom.appendTo($sliderY, element);
    }


    this.ratioX = element.clientWidth / element.scrollWidth;
    this.ratioY = element.clientHeight / element.scrollHeight;

    this.container = {
      element: element,
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
      element: $railY,
      width: 400,
      height: 1000
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
