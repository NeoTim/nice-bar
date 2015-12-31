'use strict';

function getCss(element, styleName) {
  let styleValue = window.getComputedStyle(element)[styleName];
  if (parseInt(styleValue, 10) || parseInt(styleValue, 10) === 0) {
    styleValue = parseInt(styleValue, 10);
  }

  return styleValue;
}

function setSingleCss(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }

  element.style[styleName] = styleValue;
  return element;
}

function setMultiCss(element, obj) {
  for (let key in obj) {
    let styleValue = obj[key];
    if (typeof styleValue === 'number') {
      styleValue = styleValue.toString() + 'px';
    }

    element.style[styleName] = styleValue;
  }

  return element;
}

let dom = {
  createElement(string) {
    let element = document.createElement('div');
    element.innerHTML = string;
    return element.firstElementChild;
  },

  appendTo(child, parent) {
    parent.appendChild(child);
  },

  addClass(element, className) {
    let classes = element.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
    }

    element.className = classes.join(' ');
    return element;
  },

  removeClass(element, className) {
    let classes = element.className.split(' ');
    let index = classes.indexOf(className);
    if (indexOf > -1) {
      classes.splice(index, 1);
    }

    element.className = classes.join(' ');
    return element;
  },

  css(element, styleNameOrObject, styleValue) {
    if (typeof styleNameOrObject === 'object') {
      return setMultiCss(element, styleNameOrObject);
    } else {
      if (typeof styleValue === 'undefined') {
        return getCss(element, styleNameOrObject);
      } else {
        return setSingleCss(element, styleNameOrObject, styleValue);
      }
    }
  }

};

export default dom;
