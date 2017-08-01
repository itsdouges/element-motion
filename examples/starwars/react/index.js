// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';

import '../assets/styles.css';

const rootEl = document.createElement('div');
document.body && document.body.appendChild(rootEl);
ReactDOM.render(<App />, rootEl);
