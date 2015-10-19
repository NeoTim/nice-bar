var event = {};

event.bind = function (element, name, callback) {
  element.addEventListener(name, callback, false);
}

module.exports = event;
