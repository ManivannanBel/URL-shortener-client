import React, { Component } from 'react'
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

import './_Footer.css';
import './_global.css'

class Footer extends Component {
    render() {
        return (
            <React.Fragment>
               
            <div className="footer">
              <div className="container">
                  <p className="text-muted">&copy; Copyright 2019 kut.ty</p>
              </div>
            </div>

            </React.Fragment>
        );
    }
}

export default Footer
