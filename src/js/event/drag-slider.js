var event = require('../util/event');

module.exports = function(i) {
  var currentPageY;

  event.bind(i.sliderY.element, 'mousedown', function(e) {
    currentPageY = e.pageY;
    event.bind(document, 'mousemove', mouseMoveHandler);
  });

  function mouseMoveHandler(e) {
    // console.log(e.pageY);
    // console.log(e.pageY - currentPageY);
  }


}
