// @flow

import React from 'react';

export default class ScrollToTopOnMount extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return null;
  }
}
