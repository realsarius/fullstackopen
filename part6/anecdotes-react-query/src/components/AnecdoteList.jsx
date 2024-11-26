import Anecdote from './Anecdote.jsx';
import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from '../services/requests.js';

const AnecdoteList = () => {
    const result = useQuery({
        query: ['anecdotes'],
        queryFn: getAnecdotes,
    });

    console.log(JSON.parse(JSON.stringify(result)));

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    const anecdotes = result.data;

    return (
        <ul>
            {
                anecdotes &&
                anecdotes
                    .slice()
                    .sort((a, b) => b.votes - a.votes)
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