import {applyMiddleware, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk'

import rootReducer from './reducers'


export default (history) => {
    const store = createStore(
        rootReducer,
        {},
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            apiMiddleware
        )
    );

    return store
}
