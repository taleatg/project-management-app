import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import store from './store/store';
import { Provider } from 'react-redux';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <CookiesProvider>
        <Suspense fallback={<div>Loading...</div>}>
      <App />
        </Suspense>
    </CookiesProvider>
  </Provider>
);
