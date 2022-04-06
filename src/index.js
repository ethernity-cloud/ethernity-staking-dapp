import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { ThemeProvider } from './contexts/ThemeContext';

import App from './App';

// redux
import { persistor, store } from './redux/store';

const getLibrary = (provider, connector) => new Web3Provider(provider);

ReactDOM.render(
  <HelmetProvider>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CollapseDrawerProvider>
            <ThemeProvider>
              <BrowserRouter>
                <Web3ReactProvider getLibrary={getLibrary}>
                  <App />
                </Web3ReactProvider>
              </BrowserRouter>
            </ThemeProvider>
          </CollapseDrawerProvider>
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
