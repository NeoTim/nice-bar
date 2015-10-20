var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  var currentPageY;

  event.bind(i.sliderY.element, 'mousedown', function(e) {
    currentPageY = e.pageY;
    event.bind(document, 'mousemove', mouseMoveHandler);
    event.once(document, 'mouseup', mouseUpHandler);
  });

  function mouseMoveHandler(e) {
    var newTop = e.pageY - currentPageY;
    console.log(newTop);

    if (newTop < 0) {
      newTop = 0
    } else if (newTop >= 340) {
      newTop = 340;
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
