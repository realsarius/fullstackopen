import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '', // The notification message starts as an empty string
    reducers: {
        setNotification(state, action) {
            return action.payload; // Set the notification message
        },
        clearNotification() {
            return ''; // Clear the notification message
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, seconds) => {
    return (dispatch) => {
        dispatch(setNotification(message));

        setTimeout(() => {
            dispatch(clearNotification());
        }, seconds * 1000);
    };
};

export default notificationSlice.reducer;
