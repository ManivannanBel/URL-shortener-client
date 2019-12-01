import React, { Component } from 'react'
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { loginUser } from "../actions/securityActions";
import classnames from "classnames";


import './_LandingPage.css';
import './_global.css';

class Signin extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       email : "",
       password : "",
       errors : {}
    }
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
     }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }

    if(nextProps.errors){
      this.setState({errors : nextProps.errors})
    }
  }
  
  onSubmit = (event) => {
    event.preventDefault();

    const userCreds = {
      email : this.state.email,
      password : this.state.password
    }

    this.props.loginUser(userCreds);

  }

  onChange = event => {
    this.setState({[event.target.name] : event.target.value});
  }

    render() {
      const {errors} = this.state;
        return (
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
              <Form className="margin-top-50" onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                   className={classnames("",{
                    "is-invalid" : errors.email
                  })}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.onChange}
                  value = {this.state.email}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                 className={classnames("",{
                  "is-invalid" : errors.password
                })}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                  value = {this.state.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Form>

              </Col>
            </Row>
          </Container>
        );
    }
}

Signin.propTypes = {
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  loginUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
  errors : state.errors
})

export default connect(mapStateToProps, {loginUser}) (Signin);
