import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from './component/LandingPage';
import Header from './component/Header';
import Signin from './component/Signin';
import Register from './component/Register';
import Dashboard from './component/Dashboard';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserManagement from './component/UserManagement';
import Footer from './component/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/user" component={UserManagement}/>
        <Footer/>
      </Router>


    </div>
  );
}

export default App;
