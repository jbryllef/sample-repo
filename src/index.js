import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';
import App from './main/App';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';
import './index.css';

const history = createHistory();
const middlewares = [
    routerMiddleware(history)
];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore)
const store = createStoreWithMiddleware(reducers);
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
