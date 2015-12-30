'use strict';

let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {

  function getNewTop(layerY) {
    let newTop = layerY - i.sliderY.height / 2;
    if (newTop < 0) {
      newTop = 0;
    } else if (newTop + i.sliderY.height > i.railY.height) {
      newTop = i.railY.height - i.sliderY.height;
    }

    return newTop;
  }

  function updateBox(newTop, originTop) {
    let journey = newTop - originTop;
    let scrollTop = journey / i.ratioY;
    i.box.element.scrollTop += scrollTop;
  }

  function updateSlider(newTop) {
    dom.css(i.sliderY.element, 'top', newTop);
  }

  function updateSliderYGeometry(newTop) {
    i.sliderY.deltaY = 0;
    i.sliderY.top = newTop;
  }

  function clickRailY(e) {
    let originTop = dom.css(i.sliderY.element, 'top');
    let newTop = getNewTop(e.layerY);
    updateSlider(newTop);
    updateBox(newTop, originTop);
    updateSliderYGeometry(newTop);
    e.preventDefault();
  }

  event.bind(i.railY.element, 'click', clickRailY);
};
