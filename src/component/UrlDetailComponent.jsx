import React, { Component } from "react";
import {
  Container,
  Form,
  Table,
  FormLabel,
  FormControl,
  FormGroup,
  Button,
  Row,
  Col,
  Modal,
  Card
} from "react-bootstrap";

class UrlDetailComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <Card border="info" style={{ width: "18rem" }}>
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Info Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </React.Fragment>
    );
  }
}

export default UrlDetailComponent;
