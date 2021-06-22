import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Pages/Home';

import "./Services/Firebase";
import "./Styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
