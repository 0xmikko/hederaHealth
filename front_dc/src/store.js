import storage from 'redux-persist/es/storage'
import { applyMiddleware, createStore, compose  } from 'redux'
import { createFilter   } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import apiMiddleware from './middleware';
import rootReducer from './reducers'


export default (history) => {
    const persistedFilter = createFilter(
            'auth', ['access', 'refresh']
            );

    // Redux DevTools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    const reducer = persistReducer(
    {
      key: 'polls',
      storage: storage,
      whitelist: ['auth'],
      transforms: [ persistedFilter]
    },
    rootReducer
    )

    const store = createStore(
    reducer,
    {},
    composeEnhancers(
        applyMiddleware(
            apiMiddleware,
            routerMiddleware(history),
            thunk
        )
    ));

    persistStore(store)

    return store
}
