import Article from '../components/Article';
import { Component } from 'react';
import materialView from '../../../../src/components/MaterialView';

class ArticleView extends Component {
  render () {
    return (
      <div className="end-container">
        <Article />
      </div>
    );
  }
}

export default materialView(ArticleView);
