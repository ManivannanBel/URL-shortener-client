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
import { getUserProfileDetails, updateUsername, updateEmail, updatePassword, enableAPIService } from "../actions/profileActions";
import { clearErrors, clearMessages } from "../actions/clearStateAction";

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
       modalInputName : "",
       usernameToChange : "",
       emailToChange : "",
       passwordToChange : "",
       confirmPassword : "",
       username : "",
       email : "",
       noOfLinksShortened : 0,
       noOfActiveLinks : 0,
       noOfLinksCreatedWithAPI : 0,
       totalNumberOfRedirections : 0,
       hasApi : false,
       apiKey : "",
       errors : {},
       message : {}
    }

    this.apilink = React.createRef();
  }
  
  componentDidMount(){

    this.props.getUserProfileDetails();
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.errors){
      this.setState({errors : nextProps.errors});
      //console.log(this.state.errors)
    }

    if(nextProps.message !== Object){
      //const message = {success : nextProps.message}
      //console.log(message)
      this.setState({message : nextProps.message});
    }

    const {
      username,
      email,
      noOfLinksShortened,
      noOfActiveLinks,
      noOfLinksCreatedWithAPI,
      totalNumberOfRedirections,
      hasApi,
      apiKey
    } = nextProps.userDetails;
    //console.log(nextProps.userDetails);
    this.setState({
      username,
      email,
      noOfLinksShortened,
      noOfActiveLinks,
      noOfLinksCreatedWithAPI,
      totalNumberOfRedirections,
      hasApi,
      apiKey
    });
  }

  componentWillUnmount(){

    this.props.clearErrors();
    this.props.clearMessages();

  }

  handleClose = () =>{ 
    this.setState({
      show: false,
      modalValue: "",
      changePassword: false,
      modalText: "",
      modalInputName: "",
      confirmPassword: "",
      passwordToChange: "",
      usernameToChange: "",
      emailToChange: ""
    });
  };
  
  handleShow = (text, name) =>{
     this.setState({show : true, modalText : text, modalInputName : name})
     if(text === "password")
      this.setState({changePassword : true})
  };

  onChange = (event) => {
    console.log(event.target.name)
    if(event.target.name ===  "confirmPassword"){
      this.setState({ [event.target.name] : event.target.value});
    }else{
      this.setState({ [event.target.name] : event.target.value, modalValue : event.target.value })
    }
  }

  enableApi = () => {
    this.props.enableAPIService();
  }

  updateDetail = (inputType) => {
    console.log(this.state.email)
    if(inputType === "username"){
      const data = {newUsername : this.state.usernameToChange}
      this.props.updateUsername(data);
    }else if(inputType === "email"){
      const data = {newEmail : this.state.emailToChange}
      this.props.updateEmail(data);
    }else if(inputType === "password"){
      const data = {newPassword : this.state.passwordToChange, confirmPassword : this.state.confirmPassword}
      this.props.updatePassword(data);
    }
    this.handleClose();
  }

   onCopy = () => {
    //console.log(this.shortUrl.current.value);
    //alert("Copied the text: " + this.shortUrl.current.value);
    //this.shortUrl.current.select();
    //document.execCommand('copy');
    navigator.clipboard.writeText(this.apilink.current.value);
    //event.target.focus();
    //alert("Copied the text: " + this.shortUrl.current);
  }

  render() {
    const {errors, hasApi, message} = this.state;
    return (
      <Container fluid={true}>
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

        <h2 className="margin-top-50">Profile</h2>

     
        <Row className="margin-top-20">
          <Col className="text-right-align">Username : </Col>
          <Col>{this.state.username}</Col>
          <Col><Button onClick={() => this.handleShow("username", "usernameToChange")}><FontAwesomeIcon icon={faEdit}/>Edit</Button></Col>
        </Row>
        <Row  className="margin-top-20">
          <Col className="text-right-align">Email :</Col>
          <Col>{this.state.email}</Col>
          <Col><Button onClick={() => this.handleShow("email", "emailToChange")}><FontAwesomeIcon icon={faEdit}/> Edit</Button></Col>
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
        {hasApi &&
        <Row  className="margin-top-10">
        <Col className="text-right-align">No. of links created with api :</Col>
        <Col>{this.state.noOfLinksCreatedWithAPI}</Col>
        <Col></Col>
      </Row>
        }
        <Row  className="margin-top-10">
          <Col className="text-right-align">Total No. of redirections :</Col>
          <Col>{this.state.totalNumberOfRedirections}</Col>
          <Col></Col>
        </Row>

        {!hasApi &&
        <Button className="margin-top-50" onClick={this.enableApi}>Enable an API service</Button>
        }
        <br/>
        <Button className="margin-top-20 bg-danger btn-danger" onClick={() => this.handleShow("password", "passwordToChange")}>Change Password</Button>

        {hasApi &&
        <React.Fragment>
        <br/>
        
      <form className="margin-top-20 form-inline">
                  <Form.Label className="left-right-margin col-md">Your API Link</Form.Label>
                  <input
                    className="form-control left-right-margin text-align-center col-md"
                    ref={this.apilink}
                    value={"https://kut-ty.herokuapp.com/api/" + this.state.apiKey}
                    disabled
                  />
                  <Button onClick={() => this.onCopy()} className="left-right-margin light col-md">
                    <FontAwesomeIcon className="copy-grey" icon={faCopy}/><span className="text-dark"> Copy link</span>
                  </Button>
                </form>
                <div className="margin-top-10">json body sholud contain<br/>
                <code>
                {
                  '"url"' + `:` + '"https://www.example.com"'
                 }  
                </code>
                </div>
      </React.Fragment>
        }

        <Modal show={this.state.show} onHide={this.handleClose} centered>
        <Modal.Header closeButton>
    <Modal.Title>Change {this.state.modalText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Enter new {this.state.modalText}</Form.Label>
            <Form.Control type={(this.state.changePassword?"password":"text")} name={this.state.modalInputName} value={this.state.modalValue} onChange={this.onChange} />
            { this.state.changePassword &&
              <React.Fragment>
              <Form.Label>Enter confirmation password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} />
              </React.Fragment>
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary"  onClick={() => this.updateDetail(this.state.modalText)}>
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
  userDetails : PropTypes.object.isRequired,
  updateUsername : PropTypes.func.isRequired,
  updateEmail : PropTypes.func.isRequired,
  updatePassword : PropTypes.func.isRequired,
  errors : PropTypes.object.isRequired,
  clearErrors : PropTypes.func.isRequired,
  clearMessages : PropTypes.func.isRequired,
  enableAPIService : PropTypes.func.isRequired,
  message : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userDetails : state.userDetails,
  errors : state.errors,
  message : state.message 
})

export default connect(mapStateToProps, {
  getUserProfileDetails,
  updateUsername,
  updateEmail,
  updatePassword,
  clearErrors,
  clearMessages,
  enableAPIService
})(UserManagement);
