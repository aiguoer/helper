/* eslint-disable global-require */
module.exports = {
    preset: 'ts-jest',
    globals: {
      __DEV__: true,
      __TEST__: true,
      __VERSION__: require('./package.json').version,
      'ts-jest': {}
    },
    transform: {},
    transformIgnorePatterns: [],
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['packages/**/src/*.ts'],
    watchPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    rootDir: __dirname,
    testMatch: ['<rootDir>/packages/**/__test__/**/*test.[jt]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/']
  }