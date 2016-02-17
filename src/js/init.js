'use strict';

var instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');
var hoverContainer = require('./event/hover-container');

module.exports = function (element, options) {
  var i = Object.create(instance);
  i.init(element, options);

  if (i.content.element.scrollHeight > element.clientHeight) {
    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);
    hoverContainer(i);
  }

};
