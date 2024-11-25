import Anecdote from './Anecdote.jsx';
import { useSelector } from 'react-redux';

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes);

    return (
        <ul>
            {
                anecdotes &&
                anecdotes
                    .slice() // Create a shallow copy to avoid mutating the original state
                    .sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
                    .map((anecdote) => (
                        <Anecdote
                            key={anecdote.id}
                            id={anecdote.id}
                            anecdote={anecdote.anecdote}
                            votes={anecdote.votes}
                        />
                    ))
            }
        </ul>

    );
};

export default AnecdoteList;