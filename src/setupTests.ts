window.matchMedia =
  window.matchMedia ||
  (() => {
    return { matches: false, addListener: () => {}, removeListener: () => {} };
  });

// storage
// const localStorage = require('localStorage')
// window.localStorage = window.sessionStorage = localStorage;

// connect
const _ = require('lodash');
const {connect} = require('dva');
jest.mock('dva', () => ({
  connect: _.bind(connect, {}, _, _, _, {withRef: true})
}));
