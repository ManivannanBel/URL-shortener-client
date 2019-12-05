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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { deleteUrl } from "../actions/urlActions";
import { connect } from "react-redux";

import "./_global.css";

class UrlDetailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleDelete = () => {
      
      const data = { url : this.props.urlData.original_url}
      this.props.deleteUrl(data);
      this.handleClose();
  }

  render() {
    const {
      original_url,
      shortened_url,
      no_of_redirections,
      creation_time,
      expiration_time
    } = this.props.urlData;
    // console.log(this.props)
    return (
      <React.Fragment>
        <Card border="info">
          <Card.Body>
            <Row>
              <Col sm={5}>
                <code className="text-dark">{original_url}</code>
              </Col>
              <Col sm={5}>
                Short Url: <code>https://kut-ty.herokuapp.com/{shortened_url}</code>
              </Col>
              <Col sm={2}>
                <Button onClick={this.handleShow}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{original_url}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container fluid={true}>
              <Form>
              <Form.Group as={Row}>
                <Form.Label>Short Url</Form.Label>
                <Col>
                  <FormControl
                    type="text"
                    disabled
                    defaultValue={"https://kut-ty.herokuapp.com/"+shortened_url}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>No. of redirection</Form.Label>
                <Col>
                  <FormControl
                    type="text"
                    disabled
                    defaultValue={no_of_redirections}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>Creation time</Form.Label>
                <Col>
                  <FormControl
                    type="text"
                    disabled
                    value={new Date(creation_time)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>Expiration time</Form.Label>
                <Col>
                  <FormControl
                    type="text"
                    disabled
                    value={new Date(expiration_time)}
                  />
                </Col>
              </Form.Group>
            </Form>
              </Container>
            
          </Modal.Body>
          <Modal.Footer>
            <Button className="bg-danger btn-danger" variant="danger" onClick={this.handleDelete}>
              Delete Url
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

UrlDetailComponent.propTypes = {
    deleteUrl : PropTypes.func.isRequired
}

export default connect(null, {deleteUrl}) (UrlDetailComponent);
