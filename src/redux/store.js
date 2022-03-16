import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tasksReducer from './reducers';

const rootReducer = combineReducers({ tasksReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));