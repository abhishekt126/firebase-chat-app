import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import firstReducers from './reducers/firstReducer';

const store = createStore(firstReducers);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

