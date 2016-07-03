import { Link } from 'react-router';
import { Component } from 'react';

export default class ArticleThumb extends Component {
  render () {
    return (
      <div
        onClick={this.props.doTransition}
        title={this.props.item.name}
        className="item"
        style={{ backgroundImage: `url(./assets/${this.props.item.image})` }}
      >
        <Link to={`article/${this.props.item.slug}`}>{this.props.item.name}</Link>
      </div>
    );
  }
}
