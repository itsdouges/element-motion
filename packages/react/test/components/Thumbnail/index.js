import { PropTypes } from 'react';

const styles = {
  thumbnail: {
    display: 'inline-block',
    width: 200,
    height: 200,
    backgroundColor: 'red',
    backgroundSize: 'cover',
    cursor: 'pointer',
  },
  bottom: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 55,
    height: 55,
    backgroundColor: 'blue',
    zIndex: -1,
    opacity: 0.4,
  },
};

const Thumbnail = (props) => (
  <div style={{
    ...styles.thumbnail,
    ...styles[props.position],
    backgroundImage: `url(${props.src})`,
  }}
  >
    {props.label}
  </div>
);

Thumbnail.propTypes = {
  position: PropTypes.string,
  label: PropTypes.string.isRequired,
  src: PropTypes.string,
};

export default Thumbnail;
