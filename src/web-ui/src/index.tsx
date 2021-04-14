import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ScrollToTop from './app/layout/ScrollToTop';
import 'mobx-react-lite/batchingForReactDom';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
