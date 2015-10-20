let event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  let currentPageY;
  let currentHeight;
  let currentHeightInt;
  let differenceHeight = i.railY.height - i.sliderY.height;

  event.bind(i.sliderY.element, 'mousedown', function(e) {
    currentPageY = e.pageY;
    currentHeight = dom.css(i.sliderY.element, 'top');
    currentHeightInt = parseInt(dom.css(i.sliderY.element, 'top'), 10);
    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);
  });

  function mouseMoveHandler(e) {
    let newTop = e.pageY - currentPageY + currentHeightInt;
    console.log(newTop);

    if (newTop <= 0) {
      newTop = 0
    } else if (newTop >= differenceHeight) {
      newTop = differenceHeight;
    }
    dom.css(i.sliderY.element, 'top', newTop);
    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    // console.log(2222);
    // todo
    event.unbind(document, 'mousemove', mouseMoveHandler);
  }


}
