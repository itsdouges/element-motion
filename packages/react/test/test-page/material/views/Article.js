import Article from '../components/Article';
import { Component } from 'react';
import withTransition from '../../../../src/components/WithTransition';

class ArticleView extends Component {
  componentWillLeave (cb) {
    console.log('article leaving');
    cb();
  }

  componentWillAppear (cb) {
    console.log('article appearing');
    cb();
  }

  componentWillEnter (cb) {
    console.log('article entering');
    cb();
  }

  render () {
    return (
      <Article />
    );
  }
}

export default withTransition(ArticleView, {
  immediate: true,
});
