import PropTypes from 'prop-types';

const Title = ({ text }) => <h3>{text}</h3>;

Title.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Title;