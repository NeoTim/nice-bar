'use strict';

let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {
  let sumDeltaY = 0;

  function mouseWheelHandler(e) {
    // update slider
    sumDeltaY += e.deltaY;
    let newTop = 0;

    if (sumDeltaY * i.ratioY < 0) {
      newTop = 0;
      i.sliderY.deltaY = 0;
      sumDeltaY = 0;

    } else if (sumDeltaY * i.ratioY > i.railY.height - i.sliderY.height) {
      newTop = i.railY.height - i.sliderY.height;
      sumDeltaY = i.content.element.scrollHeight - i.content.element.clientHeight;

    } else {
      newTop = sumDeltaY * i.ratioY;
    }

    dom.css(i.sliderY.element, 'top', newTop);

    // update box
    let newScrollTop = 0;
    newScrollTop += sumDeltaY;
    i.content.element.scrollTop = newScrollTop;

    // i.content.element.scrollTop = i.content.element.scrollTop +  sumDeltaY;

    e.preventDefault();
    e.stopPropagation();
  }

  event.bind(i.content.element, 'wheel', mouseWheelHandler);

};
