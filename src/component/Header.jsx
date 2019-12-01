import React, { Component } from 'react'
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { logout } from "../actions/securityActions";

import './_Header.css';
import './_global.css';

class Header extends Component {
  
    onLogoutClick = () => {
      this.props.logout();
    }

    render() {

      const {isAuthenticated, user} = this.props.auth;

      const authLinks = (
        <React.Fragment>
          <Nav className="mr-auto">
                  <Link className="nav-link nav-text-light" to="/dashboard">Dashboard</Link>
                </Nav>
                <Nav>
      <Link className="nav-link nav-text-light" to="/user"><FontAwesomeIcon icon={faUserCircle}/> {user.username}</Link>
                  <a className="nav-link nav-text-light" onClick={this.onLogoutClick}>Log out</a>
                </Nav>
        </React.Fragment>
      )

      const guestLinks = (
        <React.Fragment>
           <Nav className="mr-auto"></Nav>
           <Nav>
        <Link className="nav-link nav-text-light" to="/register">Register</Link>
        <Link className="nav-link nav-text-light" to="/signin">Sign in</Link>  
        </Nav>
        </React.Fragment>        
        )

        return (
          <div>
            <Navbar className="navbar-primary-color" collapseOnSelect expand="sm" variant="dark">
              <Link to='/'>
               <Navbar.Brand className="nav-text-light">Minima</Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                {isAuthenticated ? authLinks : guestLinks}
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
    }
}

Header.propTypes = {
  logout : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
})

export default connect(mapStateToProps, {logout}) (Header);
