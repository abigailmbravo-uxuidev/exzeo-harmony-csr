
module.exports = function (wallaby) {
  const path = require('path');
  process.env.REACT_APP_API_URL = 'http://localhost:4001/api';
  // Babel, jest-cli and some other modules are located under
  // react-scripts/node_modules, so need to let node.js know about it
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');

  process.env.REACT_APP_REQUEST_SIZE = '50';
  process.env.REACT_APP_AUTH0_DOMAIN = 'test';
  process.env.REACT_APP_AUTH0_CLIENT_ID = 'test';
  process.env.REACT_APP_AUTH0_PRIMARY_URL = 'test.test';

  require('module').Module._initPaths();

  // Babel needs this
  process.env.NODE_ENV = 'development';

  return {
    files: [
      'src/**/*.js*',
      'src/**/**/*.js*',
      'src/**/**/**/*.js*',
      '!src/**/*.spec.js*',
      '!src/**/**/*.spec.js*',
      '!src/**/**/**/*.spec.js*',
      '!src/index.js',
      '!src/routes.js',
      'src/setupTests.js'
    ],
    tests: [
      'src/**/*.spec.js*',
      'src/**/**/*.spec.js*',
      'src/**/**/**/*.spec.js*'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      }),
      '**/*.jsx': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      })
    },

    setup: () => {
      wallaby.testFramework.configure({
        testURL: 'http://localhost',
        // as in node_modules/react-scripts/utils/createJestConfig.js
        setupFiles: [require('path').join(wallaby.localProjectDir, './src/setupTests.js'), require('path').join(wallaby.localProjectDir, 'node_modules/react-scripts/config/polyfills.js')],
        moduleNameMapper: {
          '^.+\\.(jpg|jpeg|png|gif|svg)$': require.resolve('react-scripts/config/jest/fileTransform.js'),
          '^.+\\.css$': require.resolve('react-scripts/config/jest/cssTransform.js')
        }
      });
    },
    testFramework: 'jest'
  };
};
