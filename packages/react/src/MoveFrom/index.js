import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { move, waitForTarget } from 'material-transitions-core';

const styles = {
  base: {
    display: 'inline-block',
    transition: 'transform 1s',
    transformOrigin: '0 0',
    backfaceVisibility: 'hidden',
  },
};

export default class MoveFrom extends Component {
  constructor (props) {
    super(props);
    this.begin = this.begin.bind(this);
    this.state = {
      moving: false,
    };
  }

  begin () {
    const element = findDOMNode(this).children[0];
    const transition = move(element, { matchSize: true });

    console.log(transition.from);

    waitForTarget(this.props.transitionKey, (target) => {
      const to = transition.to(target);
      console.log(to);

      const location = {
        x: to.left - transition.from.left,
        y: to.top - transition.from.top,
        scaleX: to.width / transition.from.width,
        scaleY: to.height / transition.from.height,
      };

      console.log(location);

      this.setState({
        moving: true,
        /* eslint max-len:0 */
        transform: `translate3d(${location.x}px, ${location.y}px, 0) scaleX(${location.scaleX}) scaleY(${location.scaleY})`,
      });
    });
  }

  render () {
    const style = {
      ...styles.base,
      transform: this.state.transform,
    };

    return (
      <span style={style} onClick={this.begin}>
        {this.props.children}
      </span>
    );
  }
}

MoveFrom.propTypes = {
  children: PropTypes.element.isRequired,
  transitionKey: PropTypes.string.isRequired,
};
