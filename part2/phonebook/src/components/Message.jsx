import PropTypes from "prop-types";

const Message = ({ message, isError }) => {
    return (
        <div className={`message-box ${isError ? 'error' : 'success'}`}>
            <p className="message">{message}</p>
        </div>
    );
};


Message.propTypes = {
    message: PropTypes.string,
    isError: PropTypes.bool,
}

export default Message;