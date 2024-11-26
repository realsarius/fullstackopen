import Title from './Title.jsx';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateId } from '../utils/helper.js';
import { createAnecdote } from '../services/requests.js';

const AnecdoteForm = () => {
    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            if (anecdotes) {
                queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
            }
            queryClient.invalidateQueries(['anecdotes']);
        },
    });

    const addAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value.trim();
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({
            anecdote,
            votes: 0,
            id: generateId().toString(),
        });
    };

    return (
        <>
            <Title text={'Add new anecdote'} />
            <form onSubmit={addAnecdote}>
                <input type="text"
                       name={'anecdote'} />
                <button type={'submit'}>add</button>
            </form>
        </>
    );

};

export default AnecdoteForm;