import 'babel-polyfill';
import noop from 'lodash/noop';

require('jsdom-global')();

['css', 'png', 'less'].forEach((extension) => {
  require.extensions[`.${extension}`] = noop;
});

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = require('chai').expect;
global.AssertionError = require('chai').AssertionError;

global.chai.use(require('sinon-chai'));
global.chai.use(require('chai-as-promised'));
