import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reducers from "./reducers";

import App from './components/App';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>  
    </Provider>,
    document.querySelector("#root")
)