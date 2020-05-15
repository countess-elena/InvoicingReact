import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//<Form.Label>Service</Form.Label>

function Inputform (props) {
  return (


    <div className="Inputform">
      <header className="Inputform-header"> </header>
    <Form.Row>
        <Col>
            <Form.Group controlId="exampleForm.SelectCustom">
              
              <Form.Control as="select" custom>
                <option>Freight</option>
                <option>Winter surcharge</option>
                <option>add service</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            </Col>
            <Col>

              <Form.Control placeholder="cntr" placeholder="cntr_no"/>
            </Col>
            <Col>
            
            <Form.Control as="select" custom>
                <option>EUR</option>
                <option>USD</option>
              </Form.Control>
            </Col>
            <Col>
            
              <Form.Control placeholder='1'/>
            </Col>
            <Col>
              <Form.Control placeholder='0.00'/>
            </Col>
            </Form.Row>
            

          </div> ) };
          

export default Inputform