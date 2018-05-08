import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import euchreReducers from './reducers';
import initialState from './reducers/initial-state';
import App from './components/App';

const store = createStore(euchreReducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
