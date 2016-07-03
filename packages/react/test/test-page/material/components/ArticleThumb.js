import { Link } from 'react-router';

const ArticleThumb = (props) => (
  <div title={props.item.name}
    className="item"
    style={{ backgroundImage: `url(./assets/${props.item.image})` }}
  >
    <Link to={`article/${props.item.slug}`}>{props.item.name}</Link>
  </div>
);

export default ArticleThumb;
