import React, {Component} from "react";
import { Container, Form, Table, FormLabel, FormControl, FormGroup, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faCopy } from '@fortawesome/free-solid-svg-icons';
import { clearErrors, clearMessages, clearShortUrl } from "../actions/clearStateAction";
import {shortenAnonymousUser} from "../actions/urlActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import './_LandingPage.css';
import './_global.css';

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
          url : "",
          shortUrl : "",
          errors : {},
          message : {}
        }

        this.shortUrl = React.createRef();
    }

   componentDidMount(){
     if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
     }
   }

   componentWillReceiveProps(nextProps){
     if(nextProps.message){
       this.setState({message : nextProps.message});
     }
     if(nextProps.errors){
       this.setState({errors : nextProps.errors, message : {}})
     }
     this.setState({shortUrl : nextProps.urlData.shortUrl})
   }

   componentWillUnmount(){
    this.props.clearErrors();
    this.props.clearMessages();
    this.props.clearShortUrl();
   }

   onChange = event => {
    this.setState({[event.target.name] : event.target.value})
  }

  onSubmit = event => {
      event.preventDefault();
      this.props.clearErrors();
      this.props.clearMessages();
      this.props.clearShortUrl();
      //console.log(this.state.url)
      this.props.shortenAnonymousUser({url : this.state.url})
      this.setState({url : ""})
  }  

  onCopy = () => {
    //console.log(this.shortUrl.current.value);
    //alert("Copied the text: " + this.shortUrl.current.value);
    //this.shortUrl.current.select();
    //document.execCommand('copy');
    navigator.clipboard.writeText(this.shortUrl.current.value);
    //event.target.focus();
    //alert("Copied the text: " + this.shortUrl.current);
  }

  render(){
    const {shortUrl, errors, message} = this.state;

    return (
      <React.Fragment>
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
          <Form className="margin-top-50" onSubmit={this.onSubmit} >
            <FormGroup controlId="">
              <FormLabel>Shorten URL</FormLabel>
              <FormControl type="text" placeholder="Enter URL" name="url" value={this.state.url} onChange={this.onChange} />
              <Form.Text>
                This short URL will be valid only for one month, If you want
                short URL for long time then just sign in
              </Form.Text>
            </FormGroup>
            <Button type="submit"> Shorten </Button>
          </Form>

          {shortUrl && 
          <div className="margin-top-50">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                <form className="form-inline">
                  <Form.Label className="left-right-margin col-md">short url </Form.Label>
                  <input
                    className="form-control left-right-margin text-align-center col-md"
                    ref={this.shortUrl}
                    value={"www.belfa.zt/"+shortUrl}
                    disabled
                  />
                  <Button onClick={() => this.onCopy()} className="left-right-margin light col-md">
                    <FontAwesomeIcon className="copy-grey" icon={faCopy}/><span className="text-dark"> Copy link</span>
                  </Button>
                </form>
                </Col>
            </Row>
          </div>}

          <h4 className="margin-top-50">Services we offer for our users</h4>
          <Table className="margin-top-20 margin-bottom-20" striped bordered hover>
            <thead>
              <tr>
                <th>Services</th>
                <th>Anonymous members</th>
                <th>Our members</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>URL expiration</td>
                <td>1 month</td>
                <td>User defined</td>
              </tr>
              <tr>
                <td>Custom URLs</td>
                <td>
                  <FontAwesomeIcon className="ban-red" icon={faBan} />
                </td>
                <td>
                  <FontAwesomeIcon className="check-green" icon={faCheck} />
                </td>
              </tr>
              <tr>
                <td>URL shortening APIs</td>
                <td>
                  <FontAwesomeIcon className="ban-red" icon={faBan} />
                </td>
                <td>
                  <FontAwesomeIcon className="check-green" icon={faCheck} />
                </td>
              </tr>
              <tr>
                <td>URL management</td>
                <td>
                  <FontAwesomeIcon className="ban-red" icon={faBan} />
                </td>
                <td>
                  <FontAwesomeIcon className="check-green" icon={faCheck} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

LandingPage.propTypes = {
  auth : PropTypes.object.isRequired,
  clearErrors : PropTypes.func.isRequired, 
  clearMessages : PropTypes.func.isRequired,
  clearShortUrl : PropTypes.func.isRequired,
  shortenAnonymousUser : PropTypes.func.isRequired,
  errors : PropTypes.object.isRequired,
  message : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
  urlData : state.url,
  errors : state.errors,
  message : state.message
})

export default connect( mapStateToProps, {clearErrors, clearMessages, clearShortUrl, shortenAnonymousUser}) (LandingPage);
