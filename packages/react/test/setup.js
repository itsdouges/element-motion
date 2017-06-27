import { addPath } from 'app-module-path';
import path from 'path';

global.React = require('react');
global.chai.use(require('chai-enzyme')());

addPath(path.join(__dirname, '..', ''));
addPath(path.join(__dirname, '..', '/src'));
