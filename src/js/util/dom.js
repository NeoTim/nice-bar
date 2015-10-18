let dom = {};

dom.createElement = function (string) {
  var element = document.createElement('div');
  element.innerHTML = string;
  return element.firstElementChild;
};

module.exports = dom;
