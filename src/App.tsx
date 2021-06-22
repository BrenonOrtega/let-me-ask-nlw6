import React, { useContext } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  const { user, SignInWithGoogle } = useContext(AuthContext);
  return (
    <BrowserRouter>
    <AuthContext.Provider value={{user, SignInWithGoogle}}>
      <Route path="/" exact component={Home}/>
      <Route path="/rooms/new"  component={NewRoom}/> 
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;