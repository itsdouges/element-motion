import { PropTypes, Component, cloneElement } from 'react';
import TransitionGroup from 'react-addons-transition-group';

class MaterialTransitions extends Component {
  constructor (props) {
    super(props);

    this.state = {
      setEnd: undefined,
    };
  }

  getChildContext () {
    return {
      __MaterialTransitions: {
        waiting: this.waiting,
        setEnd: this.state.setEnd,
        incoming: (cb) => {
          this.incomingCb = cb;
          console.log('incoming');
        },
        outgoing: (cb) => {
          this.outgoingCb = cb;
          console.log('outcmoing');
        },
        starty: (promises) => {
          Promise.all(promises).then(() => {
            // this.incomingCb();
            // this.outgoingCb();
          });
        },
      },
    };
  }

  waiting = (callback) => {
    this.setState({
      setEnd: callback,
    });
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
  __MaterialTransitions: PropTypes.object,
};

export default MaterialTransitions;
