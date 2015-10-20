var event = require('../util/event');
var dom = require('../util/dom');

module.exports = function(i) {
  var ratioY = i.ratioY;

  // i.container.element.scrollTop = 100;
  // i.railY.element.scrollTop = 0;

  event.bind(i.railY.element, 'click', function(e) {

    var top = dom.css(i.sliderY.element, 'top');
    var topInt = parseInt(top, 10);

    var step = parseInt(i.container.height * ratioY, 10);
    var stepContent = i.container.height;

    var scrollTop = i.container.element.scrollTop;

    var topSlider = dom.css(i.railY.element, 'top');
    var topSliderInt = parseInt(dom.css(i.railY.element, 'top'), 10);

    // var time = 100;
    var speed = 4;
    var journey = i.container.height; // 400

    var time = journey / speed;
    console.log(time);
    var ti;
    var si;


    if (e.layerY > topInt) {

      var stop = topInt + step;
      var id = setInterval(function() {
        topInt = topInt + 2;
        i.sliderY.element.style.top = topInt + 'px';

        // if (topInt > stop) {
        //   window.clearInterval(id)
        // }
      }, 1);

      setTimeout(function() {
        window.clearInterval(id)
      }, time);

      var idContainer = setInterval(function() {

        topSliderInt = topSlider + 1;
        i.railY.element.style.top = topSliderInt + 'px';

        i.container.element.scrollTop = i.container.element.scrollTop + 20;
        console.log(1);

        // if (i.container.element.scrollTop > stepContent) {
        //   window.clearInterval(idContainer)
        // }

      }, 1);

      setTimeout(function() {
        i.railY.element.style.top = '400px';
        window.clearInterval(idContainer)
      }, time);





    } else {
      var stop = topInt - step;
      var id = setInterval(function() {
        topInt--;
        i.sliderY.element.style.top = topInt + 'px';

        if (topInt < stop) {
          window.clearInterval(id)
        }
      }, 1);

    }
    // console.log(topInt);
    // console.log(parseInt(dom.css(i.sliderY.element, 'top'), 10));



  });
}
