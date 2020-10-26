import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

function configureStore(state) {
    const middlewares = [thunk];
    return createStore(rootReducers, state, applyMiddleware(...middlewares));
}
export default configureStore;
