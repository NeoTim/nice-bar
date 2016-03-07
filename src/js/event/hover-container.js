'use strict';

var event = require('../util/event');

module.exports = function (i) {
  event.bind(i.container.element, 'mouseenter', function (e) {
    i.showSliderY();
  });

  event.bind(i.container.element, 'mouseleave', function (e) {
    if (!i.sliderY.isDragging) {
      i.hideSliderY();
    }
  });

};
