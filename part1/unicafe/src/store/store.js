import { createStore } from 'redux';
import counterReducer from '../reducers/counterReducer';

// Create the Redux store
const store = createStore(counterReducer);

export default store;
