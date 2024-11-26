import Button from './Button.jsx';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../services/requests.js';

const Anecdote = ({ anecdote, votes, id }) => {

    const queryClient = useQueryClient();

    const voteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes');
        },
    });

    const handleVote = () => {
        const updatedAnecdote = {
            id,
            anecdote,
            votes: votes + 1,
        };

        voteMutation.mutate(updatedAnecdote);
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


