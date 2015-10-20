let event = require('../util/event');
let dom = require('../util/dom');

module.exports = function(i) {
  let $content = i.container.element.firstElementChild;

  let ratioY = i.ratioY;
  let railYHeight = i.railY.height;

  // has bug
  function clickRailY(e) {
    let originTop = dom.css(i.sliderY.element, 'top');
    let newTop = e.layerY - i.sliderY.height / 2;

    if (newTop < 1) {
      dom.css(i.sliderY.element, 'top', newTop);
      $content.scrollTop = 0;
      return;
    }

    if (newTop + i.sliderY.height > i.railY.height) newTop = i.railY.height - i.sliderY.height;

    dom.css(i.sliderY.element, 'top', newTop);
    let journey = newTop - originTop;
    let scrollTop = journey / ratioY;
    $content.scrollTop += scrollTop;
  }

  event.bind(i.railY.element, 'click', clickRailY);

}
