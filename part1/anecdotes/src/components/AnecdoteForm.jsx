import Title from './Title.jsx';
import { useDispatch } from 'react-redux';
import { showNotification } from '../reducer/notificationSlice.js';
import { createAnecdote } from '../reducer/anecdoteSlice.js';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value.trim();
        if (anecdote) {
            dispatch(createAnecdote(anecdote));
            dispatch(showNotification(`You added ${anecdote}`, 3));
        }
        event.target.anecdote.value = '';
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