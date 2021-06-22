import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route path="Home"/>
    </BrowserRouter>
  );
}

export default App;