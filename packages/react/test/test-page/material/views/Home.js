import ArticleThumb from '../components/ArticleThumb';
import { Component } from 'react';
import withTransition from '../../../../src/components/WithTransition';
import materialView from '../../../../src/components/MaterialView';

const ArticleThumbWithTransition = withTransition(ArticleThumb, [{
  type: 'expand',
  // autoStart: true,
}, {
  type: 'move',
  matchSize: true,
  autoCleanup: true,
}]);

const items = [
  {
    name: 'Storm Trooper',
    slug: 'storm-trooper',
    image: './stormy.jpg',
  },
];

class HomeView extends Component {
  render () {
    return (
      <ul className="items">
        {items.map((item, index) => (
          <li key={index}>
            <ArticleThumbWithTransition
              item={item}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default materialView(HomeView);
