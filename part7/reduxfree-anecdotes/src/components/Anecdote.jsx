import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h1>{anecdote.content}</h1>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see <a rel={'noreferrer'} href={anecdote.info} target={'_blank'}>{anecdote.info}</a></p>
        </div>
    );
};

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        content: PropTypes.string,
        author: PropTypes.string,
        info: PropTypes.string,
        votes: PropTypes.number,
        id: PropTypes.number,
    }),
};

export default Anecdote;