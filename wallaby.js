const jsxtransform = require("fuse-test-runner").wallabyFuseTestLoader;
'use strict';
const path = require('path');
const fs = require('fs');
// const jsxtransform = require('jsx-controls-loader').loader;

module.exports = function(wallaby) {
  return {
    files: [
      'src/setupTests.ts',
      'src/*.ts*',
      // 'src/*.js',
      'src/utils/**/*.ts*',
      '!src/*.spec.ts',
      '!src/**/*.spec.tsx',
      '!src/**/*.spec.ts',
      '!src/**/*.d.ts*',
      'src/**/*.html',
    ],
    tests: [
      // 'src/setupTests.ts',
      'src/*.spec.ts',
      'src/**/*.spec.tsx',
      'src/**/*.spec.ts',
      // 'src/**/*.html',
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
    testFramework: 'jest',
    setup: function(wallaby) {
      // console.log('\u2665 setup 49', 'wallaby', wallaby);
      const appDirectory = require('fs').realpathSync(process.cwd());
      const path = require('path');
      const jestConfig = {
        mapCoverage: true,
        collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
        setupFiles: [require.resolve('react-scripts-ts/config/polyfills.js')],
        setupTestFrameworkScriptFile: path.resolve(appDirectory, './src/setupTests.ts'),
        testMatch: [
          '.spec.',
        ],
        testEnvironment: 'jsdom',
        testURL: 'http://localhost',
        transform: {
          '^.+\\.css$': require.resolve('react-scripts-ts/config/jest/cssTransform.js'),
          '^.+\\.tsx?$': require.resolve('react-scripts-ts/config/jest/typescriptTransform.js'),
          '^(?!.*\\.(js|jsx|css|json|html)$)': require.resolve('react-scripts-ts/config/jest/fileTransform.js'),
        },
        transformIgnorePatterns: [
          '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
        ],
        moduleNameMapper: {
          '^react-native$': 'react-native-web',
        },
        moduleFileExtensions: [
          'web.ts',
          'ts',
          'web.tsx',
          'tsx',
          'web.js',
          'js',
          'web.jsx',
          'jsx',
          'json',
          'html',
          'node'
        ],
        globals: {
          'ts-jest': {
            tsConfigFile: wallaby.localProjectDir + 'tsconfig.json',
          },
          '__DEV__': true,
          chrome: require('sinon-chrome')
        },
        rootDir: wallaby.localProjectDir,
      };

      wallaby.testFramework.configure(jestConfig);
    },
    teardown: function(wallaby) {
      // require('apollo-connector-mongodb').stopDatabase();
    }
  };
};