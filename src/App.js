import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from './component/LandingPage';
import Header from './component/Header';
import Signin from './component/Signin';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import UserManagement from './component/UserManagement';
import Footer from './component/Footer';
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logout } from "./actions/securityActions";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SecuredRoute from './utils/SecuredRoute';

//Check for token
if(localStorage.jwtToken){
  //set auth token
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user data
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logout());
    //Clear data
    window.location.href = "/signin";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Header/>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/" component={LandingPage}/>

        <Switch>
          <SecuredRoute exact path="/dashboard" component={Dashboard}/>
          <SecuredRoute exact path="/user" component={UserManagement}/>
        </Switch>
        <Footer/>
      </Router>
      </Provider>

    </div>
  );
}

export default App;
