'use strict';

var instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');
var hoverContainer = require('./event/hover-container');

module.exports = function(element) {
  var $content = createContentElement();

  if ($content.scrollHeight > element.clientHeight) {
    var i = Object.create(instance);
    i.init(element);

    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
    hoverContainer(i);
  }

  // //////////////////
  function createContentElement() {
    var inner = element.innerHTML;
    element.innerHTML = '<div id="niceBarContent"></div>';

    var $content = document.getElementById('niceBarContent');
    $content.innerHTML = inner;
    return $content;
  }

};
