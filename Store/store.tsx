import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import wsMiddleware from './middlewareSocket'
import orderBook from './reducers';
const rootReducer = combineReducers({
    orderBook
});
const middleware = [thunk, promise, wsMiddleware];
export const store = createStore(rootReducer, applyMiddleware(...middleware));