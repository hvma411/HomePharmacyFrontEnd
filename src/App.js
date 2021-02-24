import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
  withRouter,
  BrowserRouter as Router,
} from 'react-router-dom';
import './app.scss';
import { AuthProvider } from "./components/AuthorizationComponents/Auth";
import PrivateRoute from "./components/AuthorizationComponents/PrivateRoute";
import SignIn from "./components/AuthorizationComponents/SignIn";
import SignUp from "./components/AuthorizationComponents/SignUp";

import Main from './components/Main';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/signin" component={ SignIn } />
        <Route exact path="/signup" component={ SignUp } />
        <PrivateRoute path="/" component={ Main } />
      </Router>
    </AuthProvider>
  )
}

ReactDOM.render(
  <App />, document.getElementById("app")
);