const jsxtransform = require("fuse-test-runner").wallabyFuseTestLoader;
'use strict';
const path = require('path');
// const jsxtransform = require('jsx-controls-loader').loader;

module.exports = function(wallaby) {
  return {
    files: [
      // './setupTests.ts',
      'src/*.ts*',
      'src/utils/**/*.ts*',
      '!src/setupTests.ts',
      '!src/**/*.spec.tsx',
      '!src/**/*.spec.ts',
      '!src/**/*.d.ts*'
    ],
    tests: [
      'src/setupTests.ts',
      'src/**/*.spec.tsx', 
      'src.**/*.spec.ts', 
      'src/**/snapshots/*.json'
    ],
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ jsx: 'react', module: 'commonjs' })
    },
    preprocessors: {
      '**/*.tsx': file => jsxtransform(file.content)
    },
    env: {
      type: 'node'
    },
    workers: {
      initial: 1,
      regular: 1
    },
    hints: {
      ignoreCoverage: /ignore coverage/ 
    },
    delays: {
      run: 200
    },
    testFramework: 'mocha',
    setup: function(wallaby) {
      // require('wafl').setup({ wallaby });
    },
    teardown: function(wallaby) {
      // require('apollo-connector-mongodb').stopDatabase();
    }
  };
};