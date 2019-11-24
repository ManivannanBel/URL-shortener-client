import React, { Component } from 'react'
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'


import './_Header.css';
import './_global.css';

class Header extends Component {
    
    render() {
        return (
          <div>
            <Navbar className="navbar-primary-color" collapseOnSelect expand="sm" variant="dark">
              <Link to='/'>
               <Navbar.Brand className="nav-text-light">Minima</Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Link className="nav-link nav-text-light" to="/dashboard">Dashboard</Link>
                  {/*<Nav.Link href="#pricing">Pricing</Nav.Link>
                  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>*/}
                </Nav>
                <Nav>
                <Link className="nav-link nav-text-light" to="/user"><FontAwesomeIcon icon={faUserCircle}/>Username</Link>
                  <Link className="nav-link nav-text-light" to="/register">Register</Link>
                  <Link className="nav-link nav-text-light" to="/signin">Sign in</Link>
                  <Link className="nav-link nav-text-light" to="/signin">Log out</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
    }
}

export default Header;
