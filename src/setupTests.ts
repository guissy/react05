// storage
// const localStorage = require('localStorage')
// window.localStorage = window.sessionStorage = localStorage;

// connect
// const _ = require('lodash');
// const {connect} = require('dva');
// jest.mock('dva', () => ({
//   connect: _.bind(connect, {}, _, _, _, {withRef: true})
// }));
// console.log('☞☞☞ 9527 setupTests 11', document.URL);
const matchers = require('jest-matchers');
const GLOBAL_STATE = Symbol.for('$$jest-matchers-object');
const origin = global[GLOBAL_STATE].matchers.toBeGreaterThan;
if (!origin.ok) {
  origin.ok = true;
  global[GLOBAL_STATE].matchers.toBeGreaterThan = (...arg: any[]) => {
    const { message, pass } = origin.apply(null, arg);
    let msg = message();
    msg = msg.replace('Expected value to be greater than', '预期值大于');
    msg = msg.replace(/received/gi, '实际值');
    msg = msg.replace(/expected/gi, '预期值');
    return { message: msg, pass };
  };
}
function closest(el: HTMLElement, selector: string) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}
(window as any).chrome = require('sinon-chrome'); // tslint:disable-line
(global as any).chrome = require('sinon-chrome'); // tslint:disable-line