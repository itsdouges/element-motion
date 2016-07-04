import ArticleThumb from '../components/ArticleThumb';
import { Component } from 'react';
import withTransition from '../../../../src/components/WithTransition';

const ArticleThumbWithTransition = withTransition(ArticleThumb);

const items = [
  {
    name: 'Storm Trooper',
    slug: 'storm-trooper',
    image: './stormy.jpg',
  },
];

export default class HomeView extends Component {
  componentWillLeave (cb) {
    console.log('home leaving');
    // cb();
  }

  componentWillAppear (cb) {
    console.log('home appearing');
    cb();
  }

  componentWillEnter (cb) {
    console.log('home entering');
    cb();
  }

  render () {
    return (
      <ul className="items">
        {items.map((item, index) => (
          <li key={index}>
            <ArticleThumbWithTransition
              type="expand"
              item={item}
            />
          </li>
        ))}
      </ul>
    );
  }
}
