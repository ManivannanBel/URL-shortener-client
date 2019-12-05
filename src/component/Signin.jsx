import React, { Component } from 'react'
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { loginUser } from "../actions/securityActions";
import classnames from "classnames";
import { clearErrors, clearMessages, clearShortUrl } from "../actions/clearStateAction";


import './_LandingPage.css';
import './_global.css';

class Signin extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       email : "",
       password : "",
       errors : {},
       message : {},
       disableSigninButton : false
    }
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
     }
     if(this.props.message){
       this.state.message = this.props.message
     }
  }

  componentWillUnmount(){
    this.props.clearErrors();
    this.props.clearMessages();
    this.props.clearShortUrl();
   }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }

    if(nextProps.message){
      this.state.message = nextProps.message
    }

    if(nextProps.errors){
      this.setState({errors : nextProps.errors, message : {}, disableSigninButton : false})
    }
  }
  
  onSubmit = (event) => {
    event.preventDefault();

    this.setState({disableSigninButton : true})

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
      const {errors, message} = this.state;
        return (
          <Container>
            {errors.error && 
          <div className="margin-top-20 alert alert-danger" role="alert">
            {errors.error}
        </div>
        }
        {message.success && 
          <div className="margin-top-20 alert alert-success" role="alert">
            {message.success}
        </div>
        }
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
              <Button disabled={this.state.disableSigninButton} variant="primary" type="submit">
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
  loginUser : PropTypes.func.isRequired,
  clearErrors : PropTypes.func.isRequired, 
  clearMessages : PropTypes.func.isRequired,
  clearShortUrl : PropTypes.func.isRequired,
  message : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
  errors : state.errors,
  message : state.message
})

export default connect(mapStateToProps, {loginUser, clearErrors, clearMessages, clearShortUrl}) (Signin);
