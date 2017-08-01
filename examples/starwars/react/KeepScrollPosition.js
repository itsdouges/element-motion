// @flow

import React from 'react';

const createScrollStore = () => {
  let scrollPosition = 0;

  return class RestoreScrollPositionOnMount extends React.Component {
    componentDidMount () {
      window.scrollTo(0, scrollPosition);
    }

    componentWillUnmount () {
      if (document.body) {
        scrollPosition = document.body.scrollTop;
      }
    }

    render () {
      return null;
    }
  };
};

export default createScrollStore;
