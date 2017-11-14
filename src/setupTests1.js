const matchers = require('jest-matchers');
const GLOBAL_STATE = Symbol.for('$$jest-matchers-object');
const origin = global[GLOBAL_STATE].matchers.toBeGreaterThan;
if (!origin.ok) {
  origin.ok = true;
  global[GLOBAL_STATE].matchers.toBeGreaterThan = (...arg) => {
    const { message, pass } = origin.apply(null, arg);
    let msg = message();
    msg = msg.replace('Expected value to be greater than', '预期值大于');
    msg = msg.replace(/received/gi, '实际值');
    msg = msg.replace(/expected/gi, '预期值');
    return { message: msg, pass };
  };
}
function closest(el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}
(global).window = { chrome: require('sinon-chrome') };
(window).chrome = require('sinon-chrome'); // tslint:disable-line
(global).chrome = require('sinon-chrome'); // tslint:disable-line