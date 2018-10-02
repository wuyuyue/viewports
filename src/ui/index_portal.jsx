import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore';
import createRoutes from './routes/index_portal.jsx'
import { hashHistory } from 'react-router';

const store = configureStore();
var app =
            <Provider store={store}>
              { createRoutes(hashHistory) }
            </Provider>

// import {renderToString} from 'react-dom/server'
// //console.log(renderToString(app));

ReactDOM.render(app, document.getElementById('app'));
