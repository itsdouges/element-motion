import ArticleThumb from '../components/ArticleThumb';
import { Component } from 'react';

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
    cb();
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
            <ArticleThumb item={item} />
          </li>
        ))}
      </ul>
    );
  }
}
