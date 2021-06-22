import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';

import "./Services/Firebase";
import "./Styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    {/* <Home /> */}
    <NewRoom />
  </React.StrictMode>,
  document.getElementById('root')
);
