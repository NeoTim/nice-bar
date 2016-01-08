'use strict';

var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  var originPageY;
  var originTop;
  var originScrollTop;
  var differenceHeight = i.railY.height - i.sliderY.height;
  var ratioY = i.ratioY;

  event.bind(i.sliderY.element, 'mousedown', function(e) {
    originPageY = e.pageY;
    originTop = dom.css(i.sliderY.element, 'top');
    originScrollTop = i.content.element.scrollTop;

    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);

  });

  /**
   * mouseMoveHandler
   * @param  {object} e event
   * @return null
   */
  function mouseMoveHandler(e) {
    i.showSliderY();

    i.sliderY.deltaY = 0;

    // update slider
    var newTop = e.pageY - originPageY + originTop;

    if (newTop <= 0) {
      newTop = 0;
    } else if (newTop >= differenceHeight) {
      newTop = differenceHeight;
    }

    i.sliderY.top = newTop;
    dom.css(i.sliderY.element, 'top', newTop);

    // udpate content
    var journey = newTop - originTop;
    var newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop;
    i.content.element.scrollTop = newScrollTop;
    i.sumDeltaY = i.content.element.scrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    event.unbind(document, 'mousemove', mouseMoveHandler);

    i.hideSliderY();
  }
};
