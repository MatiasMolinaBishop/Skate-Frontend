import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//As we want to provide these values to all of the components in our application, we will import the AuthProviderWrapper in the index.js and wrap it around the root component <App />:

import { AuthProviderWrapper } from "./context/auth.context";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);


reportWebVitals();
