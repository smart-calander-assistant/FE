// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './fonts.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { registerLicense  } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VlhiQldPd0BGQmFJfFdmRGFTf116d1RWESFaRnZdQVxhSXtTdkVqWn5Zcndd');

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
