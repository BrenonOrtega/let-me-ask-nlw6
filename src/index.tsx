import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Home } from './Pages/Home';

import "./Styles/global.scss";
import "./services/firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
