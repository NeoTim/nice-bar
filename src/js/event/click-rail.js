let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {

  function updateSliderYGeometry(newTop) {
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  function clickRailY(e) {

    let originTop = dom.css(i.sliderY.element, 'top');
    let newTop = e.layerY - i.sliderY.height / 2;

    if (newTop < 0) {
      dom.css(i.sliderY.element, 'top', 0);
      i.box.element.scrollTop = 0;
    } else {
      if (newTop + i.sliderY.height > i.railY.height) newTop = i.railY.height - i.sliderY.height;
      dom.css(i.sliderY.element, 'top', newTop);
    }


    // update box
    let journey = newTop - originTop;
    let scrollTop = journey / i.ratioY;
    i.box.element.scrollTop += scrollTop;

    updateSliderYGeometry(newTop);
    e.preventDefault();
  }

  event.bind(i.railY.element, 'click', clickRailY);

}
