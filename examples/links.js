// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './links.css';

const libraries = ['react'];
const links = ['box', 'reveal', 'starwars'];

const Links = () => (
  <div className="link-container">
    <a className="github-cta" href="https://github.com/madou/yubaba">Back to GitHub</a>
    {links.map((link) =>
      libraries.map((lib) => <a href={`/yubaba/examples/${lib}/${link}`}>{`${lib}js ${link}`}</a>))}
  </div>
);

const rootEl = document.createElement('div');
document.body && document.body.appendChild(rootEl);
ReactDOM.render(<Links />, rootEl);
