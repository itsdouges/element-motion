import { PropTypes, Component, cloneElement } from 'react';
import TransitionGroup from 'react-addons-transition-group';

class MaterialTransitions extends Component {
  getChildContext () {
    return {
      trigger: this.trigger,
    };
  }

  trigger (you) {
    console.log('hey', you);
  }

  render () {
    return (
      <TransitionGroup>
        {cloneElement(this.props.children, {
          key: this.props.location.pathname,
        })}
      </TransitionGroup>
    );
  }
}

MaterialTransitions.childContextTypes = {
  trigger: PropTypes.func,
};

export default MaterialTransitions;
