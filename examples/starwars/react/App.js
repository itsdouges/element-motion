// @flow

import React from 'react';

import DetailsPage from './DetailsPage';
import ListPage from './ListPage';
import items from './data';

export default class App extends React.Component {
  state = {
    item: items[0],
    showDetails: false,
  };

  select = (item: any) => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
      item,
    }));
  };

  render () {
    return (
      <div className="root">
        {this.state.showDetails && <DetailsPage onClick={this.select} {...this.state.item} />}
        {this.state.showDetails || <ListPage onClick={this.select} />}
      </div>
    );
  }
}
