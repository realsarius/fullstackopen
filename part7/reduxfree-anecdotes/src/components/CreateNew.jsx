import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/customHooks.js';
import PropTypes from 'prop-types';

const CreateNew = (props) => {
    const content = useField('text', 'content');
    const author = useField('text', 'author');
    const url = useField('text', 'url');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addNew({
            content: content.inputProps.value,
            author: author.inputProps.value,
            info: url.inputProps.value,
            votes: 0,
        });

        navigate('/');
    };

    const handleResetFields = (event) => {
        event.preventDefault();

        content.resetField();
        author.resetField();
        url.resetField();
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.inputProps} />
                </div>
                <div>
                    author
                    <input {...author.inputProps} />
                </div>
                <div>
                    url for more info
                    <input {...url.inputProps} />
                </div>
                <button type={'submit'}>create</button>
                <button onClick={handleResetFields}>reset</button>
            </form>
        </div>
    );
};

CreateNew.propTypes = {
    addNew: PropTypes.func.isRequired,
};

export default CreateNew;