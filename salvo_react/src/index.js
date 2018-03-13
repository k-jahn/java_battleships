import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SalvoApp from './component/SalvoApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './store/reducers';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <SalvoApp />
    </BrowserRouter>
  </Provider>
), document.getElementById('root')
);
registerServiceWorker();
