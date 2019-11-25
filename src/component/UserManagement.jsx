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
import { faCheck, faBan, faCopy, faEdit } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserProfileDetails } from "../actions/profileActions";

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
  
  componentDidMount(){
    const id = "5dd6018855978547d4330831";

    this.props.getUserProfileDetails(id);
  }

  componentWillReceiveProps(nextProps){
    const {username, email, noOfLinksShortened, noOfActiveLinks, noOfLinksCreatedWithAPI, totalNumberOfRedirections} = nextProps.userDetails;
    console.log(nextProps.userDetails);
    this.setState({
      username,
      email,
      noOfLinksShortened,
      noOfActiveLinks,
      noOfLinksCreatedWithAPI,
      totalNumberOfRedirections
    })
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

     
        <Row className="margin-top-20">
          <Col className="text-right-align">Username : </Col>
          <Col>{this.state.username}</Col>
          <Col><Button onClick={() => this.handleShow("username")}><FontAwesomeIcon icon={faEdit}/>Edit</Button></Col>
        </Row>
        <Row  className="margin-top-20">
          <Col className="text-right-align">Email :</Col>
          <Col>{this.state.email}</Col>
          <Col><Button onClick={() => this.handleShow("email")}><FontAwesomeIcon icon={faEdit}/> Edit</Button></Col>
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

UserManagement.propTypes = {
  getUserProfileDetails : PropTypes.func.isRequired,
  userDetails : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userDetails : state.userDetails  
})

export default connect(mapStateToProps, {getUserProfileDetails}) (UserManagement);
