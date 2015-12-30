let Instance = require('./instance');
let clickRail = require('./event/click-rail');
let dragSlider = require('./event/drag-slider');
let mouseWheel = require('./event/mouse-wheel');
let pressKeyboard = require('./event/press-keyboard');

module.exports = function(element) {
  let $content = element.firstElementChild;
  if ($content.scrollHeight > $content.clientHeight) {
    let i = new Instance(element);

    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
  }
};
