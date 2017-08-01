import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '../assets/styles.css';
import App from './App';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);
ReactDOM.render(<App />, rootEl);
