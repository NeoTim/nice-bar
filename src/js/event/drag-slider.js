'use strict';

let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {
  let originPageY;
  let originTop;
  let originScrollTop;
  let differenceHeight = i.railY.height - i.sliderY.height;
  let ratioY = i.ratioY;

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

    i.sliderY.deltaY = 0;

    // update slider
    let newTop = e.pageY - originPageY + originTop;

    if (newTop <= 0) {
      newTop = 0;
    } else if (newTop >= differenceHeight) {
      newTop = differenceHeight;
    }

    i.sliderY.top = newTop;
    dom.css(i.sliderY.element, 'top', newTop);

    // udpate content
    let journey = newTop - originTop;
    let newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop;
    i.content.element.scrollTop = newScrollTop;
    i.sumDeltaY = i.content.element.scrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    event.unbind(document, 'mousemove', mouseMoveHandler);
  }
};
