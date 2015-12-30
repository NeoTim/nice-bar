'use strict';

let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {
  i.sumDeltaY = 0;

  function mouseWheelHandler(e) {
    // update slider
    i.sumDeltaY += e.deltaY;
    let newTop = 0;

    if (i.sumDeltaY * i.ratioY < 0) {
      newTop = 0;
      i.sliderY.deltaY = 0;
      i.sumDeltaY = 0;

    } else if (i.sumDeltaY * i.ratioY > i.railY.height - i.sliderY.height) {
      newTop = i.railY.height - i.sliderY.height;
      i.sumDeltaY = i.content.element.scrollHeight - i.content.element.clientHeight;

    } else {
      newTop = i.sumDeltaY * i.ratioY;
    }

    dom.css(i.sliderY.element, 'top', newTop);

    // update box
    let newScrollTop = 0;
    newScrollTop += i.sumDeltaY;
    i.content.element.scrollTop = newScrollTop;

    // i.content.element.scrollTop = i.content.element.scrollTop +  i.sumDeltaY;

    e.preventDefault();
    e.stopPropagation();
  }

  event.bind(i.content.element, 'wheel', mouseWheelHandler);

};
