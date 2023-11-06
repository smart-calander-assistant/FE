import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './fonts.css';

// const AppProvider = ({ contexts, children }) =>
//     contexts.reduce(
//         (prev, context) =>
//             React.createElement(context, {
//                 children: prev,
//             }),
//         children
//     );

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
