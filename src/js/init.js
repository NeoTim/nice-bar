'use strict';

var Instance = require('./instance');
var clickRail = require('./event/click-rail');
var dragSlider = require('./event/drag-slider');
var mouseWheel = require('./event/mouse-wheel');
var pressKeyboard = require('./event/press-keyboard');

var event = require('./util/event');
var dom = require('./util/dom');

module.exports = function(element) {

  var inner = element.innerHTML;
  element.innerHTML = '';
  element.innerHTML = '<div id="niceBarContent"></div>';

  var $content = document.getElementById('niceBarContent');
  $content.innerHTML = inner;

  if ($content.scrollHeight > element.clientHeight) {
    var i = new Instance(element);

    clickRail(i);
    dragSlider(i);
    mouseWheel(i);
    pressKeyboard(i);

    event.bind(i.container.element, 'mouseenter', function(e) {
      dom.addClass(i.sliderY.element, 'fade-in');
      dom.removeClass(i.sliderY.element, 'fade-out');
    });

    event.bind(i.container.element, 'mouseleave', function(e) {
      dom.addClass(i.sliderY.element, 'fade-out');
      dom.removeClass(i.sliderY.element, 'fade-in');
    });

  }
};
