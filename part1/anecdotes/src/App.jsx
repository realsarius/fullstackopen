import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Title from './components/Title.jsx';
import Notification from './components/Notification.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducer/anecdoteSlice.js';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, []);

    return (
        <div>
            <Title text={'Anecdotes'} />
            <Notification />
            <AnecdoteForm />
            <AnecdoteList />
        </div>
    );
};

export default App;