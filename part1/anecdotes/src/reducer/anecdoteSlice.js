import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService.js';


const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        vote(state, action) {
            const anecdote = state.find(a => a.id === action.payload.id);
            if (anecdote) {
                anecdote.votes += 1;
            }
        },
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
    };
};

export default anecdoteSlice.reducer;