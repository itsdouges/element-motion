import { Link } from 'react-router';

const items = [
  {
    name: 'Storm Trooper',
    slug: 'storm-trooper',
    image: './stormy.jpg',
  },
];

const HomeView = () => (
  <ul className="items">
    {items.map((item, index) => (
      <li title={item.name}
        className="item"
        key={index}
        style={{ backgroundImage: `url(./assets/${item.image})` }}
      >
        <Link to={`article/${item.slug}`}>{item.name}</Link>
      </li>
    ))}
  </ul>
);

export default HomeView;
