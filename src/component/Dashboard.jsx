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
  Accordion,
  Card
} from "react-bootstrap";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faCopy } from "@fortawesome/free-solid-svg-icons";
import { shortenUrl, getUrlList } from "../actions/urlActions";
import { clearErrors, clearMessages, clearShortUrl } from "../actions/clearStateAction"
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import "./_Dashboard.css";
import "./_global.css";
import UrlDetailComponent from "./UrlDetailComponent";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          url : "",
          shortUrl : "",
          urls : [],
          errors : {},
          message : {}
        }

        this.shortUrl = React.createRef();
    }

    componentDidMount(){
      const id = "5dd6018855978547d4330831";
      this.props.getUrlList(id);
    }

   componentWillReceiveProps(nextProps){

      if(nextProps.errors){
        this.setState({errors : nextProps.errors})
      }

      if(nextProps.message){
        this.setState({message : nextProps.message})
      }

      const {urlList, shortUrl} = nextProps.urlData
      this.setState({shortUrl, urls : urlList});
   }

   componentWillUnmount(){
     this.props.clearErrors();
     this.props.clearMessages();
     this.props.clearShortUrl();
   }

  onSubmit = event => {
      event.preventDefault();
      const id = "5dd6018855978547d4330831";
      this.props.clearErrors();
      this.props.clearMessages();
      this.props.clearShortUrl();
      this.props.shortenUrl({url : this.state.url}, id)
      this.props.getUrlList(id);
  }  

  onChange = event => {
    this.setState({[event.target.name] : event.target.value})
  }

  onCopy = () => {
    console.log(this.shortUrl.current.value);
    //alert("Copied the text: " + this.shortUrl.current.value);
    //this.shortUrl.current.select();
    //document.execCommand('copy');
    navigator.clipboard.writeText(this.shortUrl.current.value);
    //event.target.focus();
    //alert("Copied the text: " + this.shortUrl.current);
  }

  render() {
    const {shortUrl, errors, message, urls} = this.state;

    const shortenedUrlsList = () => {
      const shortUrls = urls.filter(url => !url.is_api);
      //console.log(shortUrls);
      //console.log("lens "+ shortUrls.length);
      if(shortUrls.length === 0){
        return (
          <div className="alert alert-success" role="alert">
            You have no shortened URLs
          </div>
        )
      }else{
        return (shortUrls.map(urlData => (
          <UrlDetailComponent key={urlData._id} urlData={urlData}/>
        )))
      }
    } 


    const apiUrlsList = () => {
      const apiUrls = urls.filter(url => url.is_api);
      //console.log(apiUrls)
      //console.log("len "+apiUrls.length)
      if(apiUrls.length === 0){
        return (
          <div class="alert alert-success" role="alert">
            You have no shortened URLs created with API
          </div>
        )
      }else{
        return (apiUrls.map(urlData => (
          <UrlDetailComponent key={urlData._id} urlData={urlData}/>
        )))
      }
    } 
  

    return (
      <React.Fragment>
        <Container>
        {errors.error && 
          <div class="margin-top-20 alert alert-danger" role="alert">
            {errors.error}
        </div>
        }
        {message.success && 
          <div class="margin-top-20 alert alert-success" role="alert">
            {message.success}
        </div>
        }
          <Form className="margin-top-50" onSubmit={this.onSubmit}>
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
                <Form.Label className="left-right-margin col-md">
                  short url
                </Form.Label>
                <input
                  className="form-control left-right-margin text-align-center col-md"
                  ref={this.shortUrl}
                  value={"https://belfa.zt/"+shortUrl}
                  disabled
                />
                <Button
                  onClick={() => this.onCopy()}
                  className="left-right-margin light col-md"
                >
                  <FontAwesomeIcon className="copy-grey" icon={faCopy} />
                  <span className="text-dark"> Copy link</span>
                </Button>
              </form>
            </Col>
          </Row>
        </div>

          }
        </Container>

        <Container fluid={true} className="margin-top-50">
          <h4>Manage URLs</h4>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle className="text-dark-hover" as={Link} variant="link" eventKey="0">
                  URLs shortened
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {shortenedUrlsList()}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle className="text-dark-hover" as={Link} variant="link" eventKey="1">
                  URLs shortened with API
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {apiUrlsList()}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  shortenUrl : PropTypes.func.isRequired,
  urlData : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
  message : PropTypes.object.isRequired,
  clearErrors : PropTypes.func.isRequired,
  clearMessages : PropTypes.func.isRequired,
  clearShortUrl : PropTypes.func.isRequired, 
  getUrlList : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  urlData : state.url,
  errors : state.errors,
  message : state.message   
})

export default connect(mapStateToProps,{shortenUrl, clearErrors, clearMessages, clearShortUrl, getUrlList}) (Dashboard);
