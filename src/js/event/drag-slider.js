let event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  let originPageY;
  let originTop;
  let originScrollTop;
  let differenceHeight = i.railY.height - i.sliderY.height;
  let $content = i.container.element.firstElementChild;
  let ratioY = i.ratioY;

  event.bind(i.sliderY.element, 'mousedown', function(e) {
    originPageY = e.pageY;
    originTop = dom.css(i.sliderY.element, 'top');
    originScrollTop = $content.scrollTop;

    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);
  });

  function mouseMoveHandler(e) {

    // update slider
    let newTop = e.pageY - originPageY + originTop;

    if (newTop <= 0) {
      newTop = 0
    } else if (newTop >= differenceHeight) {
      newTop = differenceHeight;
    }
    dom.css(i.sliderY.element, 'top', newTop);

    // udpate content
    let journey = newTop - originTop;
    let newScrollTop = journey / ratioY;
    newScrollTop += originScrollTop
    $content.scrollTop = newScrollTop;

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    // console.log(2222);
    // todo
    event.unbind(document, 'mousemove', mouseMoveHandler);
  }


}
