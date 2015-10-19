let dom = {};

function getCss(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function setSingleCss(element, styleName, styleValue) {
  if (typeof styleValue === 'number') styleValue = styleValue.toString() + 'px';
  console.log(styleName);
  console.log(styleValue);
  element.style[styleName] = styleValue;
  return element;
}

function setMultiCss(element, obj) {
  for (let key in obj) {
    let styleValue = obj[key]
    if (typeof styleValue === 'number') styleValue = styleValue.toString() + 'px';
    element.style[styleName] = styleValue;
  }
  return element;
}

dom.createElement = function(string) {
  let element = document.createElement('div');
  element.innerHTML = string;
  return element.firstElementChild;
};

dom.appendTo = function(child, parent) {
  parent.appendChild(child);
};

dom.addClass = function(element, className) {
  let classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
  return element;
};

dom.removeClass = function(element, className) {
  let classes = element.className.split(' ');
  let index = classes.indexOf(className);
  if (indexOf > -1) {
    classes.splice(index, 1);
  }
  element.className = classes.join(' ');
  return element;
};

dom.css = function(element, styleNameOrObject, styleValue) {
  console.log(element);
  if (typeof styleNameOrObject === 'object') {
    return setMultiCss(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return getCss(element, styleNameOrObject);
    } else {
      return setSingleCss(element, styleNameOrObject, styleValue);
    }
  }
};

module.exports = dom;
