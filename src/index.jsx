import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers/applicationReducer';
import App from './App';

const store = createStore(rootReducer);
const root = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root
);
