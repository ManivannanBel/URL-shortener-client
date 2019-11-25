import React, { Component } from 'react'
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { createUser } from "../actions/securityActions";

import './_LandingPage.css';
import './_global.css';

class Register extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       username : "",
       email : "",
       password : "",
       confirmPassword : "", 
       errors : {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors : nextProps.errors});
    }
  } 

  onChange = event => {
    this.setState({[event.target.name] : event.target.value})
  }

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      username : this.state.username,
       email : this.state.email,
       password : this.state.password,
       confirmPassword : this.state.confirmPassword, 
    }

    console.log(newUser)

    this.props.createUser(newUser, this.props.history);

  }

    render() {

      const {errors} = this.state;

        return (
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
              <Form className="margin-top-50" onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  className={classnames("",{
                    "is-invalid" : errors.username
                  })}
                  placeholder="Enter username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  className={classnames("",{
                    "is-invalid" : errors.email
                  })}
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className={classnames("",{
                    "is-invalid" : errors.password
                  })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className={classnames("",{
                    "is-invalid" : errors.confirmPassword
                  })}
                  placeholder="Confirmation password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Group>
              <Form.Text className="text-dark">
                  We'll never share your email with anyone else.
                </Form.Text>
              <Button className="margin-top-20" variant="primary" type="submit">
                Sign in
              </Button>
            </Form>

              </Col>
            </Row>
          </Container>
        );
    }
}

Register.propTypes = {
  errors : PropTypes.object.isRequired,
  createUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors : state.errors
})

export default connect(mapStateToProps ,{createUser})(Register);
