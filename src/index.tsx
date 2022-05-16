import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
);
