import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

const getStore = () => {
    if (store) {
        return store;
    } else {
        store = createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(thunk)),
        );
        return store;
    }
};
export default getStore;

export const dispatchAction = (action) => {
    getStore().dispatch(action);
};