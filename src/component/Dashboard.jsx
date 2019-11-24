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
import "./_Dashboard.css";
import "./_global.css";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.shortUrl = React.createRef();
    }

   

  onSubmit = event => {
      event.preventDefaults();
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
    return (
      <React.Fragment>
        <Container>
          <Form className="margin-top-50" onSubmit={this.onSubmit}>
            <FormGroup controlId="">
              <FormLabel>Shorten URL</FormLabel>
              <FormControl type="text" placeholder="Enter URL" name="url" />
              <Form.Text>
                This short URL will be valid only for one month, If you want
                short URL for long time then just sign in
              </Form.Text>
            </FormGroup>
            <Button type="submit"> Shorten </Button>
          </Form>

          <div className="margin-top-50">
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <form className="form-inline">
                  <Form.Label className="left-right-margin col-md">
                    short url{" "}
                  </Form.Label>
                  <input
                    className="form-control left-right-margin text-align-center col-md"
                    ref={this.shortUrl}
                    value="www.belfa.zt/AgfDtH"
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
                  <div class="alert alert-success" role="alert">
                    You have no shortened URLs
                  </div>
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
                  <div class="alert alert-success" role="alert">
                    You have no shortened URLs created with API
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
