import { Component, PropTypes } from 'react';

const DecorateMaterialView = (ComposedComponent) => class MaterialView extends Component {
  static contextTypes = {
    __MaterialTransitions: PropTypes.object,
  };

  componentWillLeave (cb) {
    this.context.__MaterialTransitions.outgoing(cb);
  }

  componentWillAppear (cb) {
    cb();
  }

  componentWillEnter (cb) {
    this.context.__MaterialTransitions.incoming(cb);
  }

  render () {
    return (
      <ComposedComponent {...this.props} />
    );
  }
};

export default DecorateMaterialView;
