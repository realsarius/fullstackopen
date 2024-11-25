import PropTypes from 'prop-types';

const Display = ({ value }) => {
    return <p>has {value ? value : 0} votes</p>;
};

Display.propTypes = {
    value: PropTypes.number,
};

export default Display;