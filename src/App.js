import './App.css';
import React, { createContext, useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
        {/* <p>Name: {loggedInUser.name}</p> */}
        <Header></Header>
        <Switch>
          
          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="*">
              <NoMatch></NoMatch>
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
