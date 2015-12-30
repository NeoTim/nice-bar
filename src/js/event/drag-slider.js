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
    originScrollTop = i.box.element.scrollTop;

    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);
  });

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

    // udpate box
    let journey = newTop - originTop;
    let newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop;
    i.box.element.scrollTop = newScrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    // console.log(2222);
    // todo
    event.unbind(document, 'mousemove', mouseMoveHandler);
  }

};
