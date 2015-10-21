let event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  let differenceHeight = i.railY.height - i.sliderY.height;

  event.bind(i.box.element, 'wheel', mouseWheelHandler);

  function mouseWheelHandler(e) {

    // update slider
    i.sliderY.deltaY += e.deltaY;
    let newTop = i.sliderY.top + i.sliderY.deltaY * i.ratioY;

    if (newTop < 0) {
      newTop = 0;
      i.sliderY.top = 0;
      i.sliderY.deltaY = 0
    }

    if (newTop > differenceHeight) {
      newTop = differenceHeight;
      i.sliderY.deltaY = i.box.element.scrollHeight - i.box.element.clientHeight;
      i.sliderY.top = 0;
    }

    dom.css(i.sliderY.element, 'top', newTop);

    //update box
    var newScrollTop = 0;
    newScrollTop += i.sliderY.deltaY;
    i.box.element.scrollTop = newScrollTop;


    e.preventDefault();
    e.stopPropagation();
  }

}
