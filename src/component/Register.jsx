import React, { Component } from 'react'
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import './_LandingPage.css';
import './_global.css';

class Register extends Component {
    render() {
        return (
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
              <Form className="margin-top-50">
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
                </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmation password"
                  name="confirmPassword"
                />
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

export default Register;
