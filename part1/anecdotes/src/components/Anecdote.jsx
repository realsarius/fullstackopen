import Button from './Button.jsx';
import store from '../store/store.js';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { vote } from '../reducer/anecdoteSlice.js';
import { showNotification } from '../reducer/notificationSlice.js';
import anecdoteService from '../services/anecdoteService.js';

const Anecdote = ({ anecdote, votes, id }) => {
    const dispatch = useDispatch();

    const handleVote = async () => {
        try {
            const updatedAnecdote = await anecdoteService.increaseVote(id, votes + 1);

            dispatch(vote({ id }));
            dispatch(showNotification(`you voted '${anecdote.content}'`, 10));

        } catch (error) {
            console.error('Error updating votes: ', error);
        }
    };

    return (
        <li>
            <p>{anecdote}</p>
            <span>Votes: {votes} </span>
            <Button
                text={'vote'}
                handleClick={handleVote}
            />
        </li>
    );
};

Anecdote.propTypes = {
    id: PropTypes.string.isRequired,
    anecdote: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
};

export default Anecdote;


