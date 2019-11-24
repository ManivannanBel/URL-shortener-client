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
  Modal
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faCopy } from "@fortawesome/free-solid-svg-icons";
import "./_UserManagement.css";
import "./_global.css";

class UserManagement extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       show : false,
       changePassword : false,
       modalText : "",
       modalValue : "",
       username : "username",
       email : "example@mail.com",
       noOfLinksShortened : 0,
       noOfActiveLinks : 0,
       noOfLinksCreatedWithAPI : 0,
       totalNumberOfRedirections : 0
    }
  }
  

  handleClose = () =>{ 
    this.setState({show : false, modalValue : "", changePassword : false })
  };
  
  handleShow = (text) =>{
     this.setState({show : true, modalText : text})
     if(text === "password")
      this.setState({changePassword : true})
  };

  onChange = (event) => {
    this.setState({ [event.target.name] : event.target.value, modalValue : event.target.value })
  }

  render() {
    return (
      <Container fluid={true}>
        <h2 className="margin-top-50">Profile</h2>

        {/*<table className="margin-top-20 profile-table" striped bordered hover>
          <tbody>
            <tr>
              <td className="text-right-align"><span className="padding-right-50">Username </span>:</td>
              <td className="text-left-align padding-left-50">manivannan</td>
              <td>
                <Button onClick={() => this.handleShow("username")}>Edit</Button>
              </td>
            </tr>
               <tr>
              <td className="text-right-align"><span className="padding-right-50">email  </span>:</td>
              <td className="text-left-align padding-left-50">manivannan@mail.com</td>
              <td>
                <Button onClick={() => this.handleShow("email")}>Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="text-right-align"><span className="padding-right-50">No. of links shortened  </span>:</td>
              <td className="text-left-align padding-left-50" colSpan="2">10</td>
            </tr>
            <tr>
              <td className="text-right-align"><span className="padding-right-50">No. of active links  </span>:</td>
              <td className="text-left-align padding-left-50" colSpan="2">10</td>
            </tr>
            <tr>
              <td className="text-right-align"><span className="padding-right-50">No. of links created with api  </span>:</td>
              <td className="text-left-align padding-left-50" colSpan="2">10</td>
            </tr>
            <tr>
              <td className="text-right-align"><span className="padding-right-50">Total No. of redirection  </span>:</td>
              <td className="text-left-align padding-left-50" colSpan="2">10</td>
            </tr>
          </tbody>
        </table>*/}

        <Row className="margin-top-20">
          <Col className="text-right-align">Username : </Col>
          <Col>{this.state.username}</Col>
          <Col><Button onClick={() => this.handleShow("username")}>Edit</Button></Col>
        </Row>
        <Row  className="margin-top-20">
          <Col className="text-right-align">Email :</Col>
          <Col>{this.state.email}</Col>
          <Col><Button onClick={() => this.handleShow("email")}>Edit</Button></Col>
        </Row>
        <Row  className="margin-top-20">
          <Col className="text-right-align">No. of links shortened :</Col>
          <Col>{this.state.noOfLinksShortened}</Col>
          <Col></Col>
        </Row>
        <Row  className="margin-top-10">
          <Col className="text-right-align">No. of active links :</Col>
          <Col>{this.state.noOfActiveLinks}</Col>
          <Col></Col>
        </Row>
        <Row  className="margin-top-10">
          <Col className="text-right-align">No. of links created with api :</Col>
          <Col>{this.state.noOfLinksCreatedWithAPI}</Col>
          <Col></Col>
        </Row>
        <Row  className="margin-top-10">
          <Col className="text-right-align">Total No. of redirections :</Col>
          <Col>{this.state.totalNumberOfRedirections}</Col>
          <Col></Col>
        </Row>

        <Button className="margin-top-50" >Enable an API service</Button>
        <br/>
        <Button className="margin-top-20 bg-danger btn-danger" onClick={() => this.handleShow("password")}>Change Password</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
    <Modal.Title>Change {this.state.modalText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Enter new {this.state.modalText}</Form.Label>
            <Form.Control type="text" name={this.state.modalText} value={this.state.modalValue} onChange={this.onChange} />
            { this.state.changePassword &&
              <React.Fragment>
              <Form.Label>Enter confirmation password</Form.Label>
              <Form.Control type="text" name={this.state.modalText} value={this.state.modalValue} onChange={this.onChange} />
              </React.Fragment>
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Update
          </Button>
        </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default UserManagement;
