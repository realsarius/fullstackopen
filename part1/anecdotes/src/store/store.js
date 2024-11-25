import anecdoteReducer from '../reducer/anecdoteSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../reducer/notificationSlice.js';

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
    },
});

// The thunk middleware was automatically added

export default store;