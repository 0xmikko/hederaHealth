import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import App from './containers/App';
import configureStore from './store'


const history = createHistory();

export const store = configureStore(history);

ReactDOM.render((
		<Provider store={store}>
	      	<ConnectedRouter history={history}>
	        	<App  store={store} />
			</ConnectedRouter>
		</Provider>

  ), document.getElementById('root'));
