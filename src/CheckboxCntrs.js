import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Formel from './Formelement';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CheckboxCntr extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            price: 0,
            checkedSet: (this.props.cntr_numbers),
            invContent: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange (event) {
        const target = event.target.name;
        //this.setState ({checkedSet: this.props.cntr_numbers});
        //var cntrs = this.props.cntr_numbers.slice(); 
        var cntrs = this.state.checkedSet.slice();

        if (cntrs.includes(target)) {
        var ind =cntrs.indexOf (target);
        delete cntrs[ind]
        cntrs = cntrs.filter(element => element !== null);
        this.setState ({checkedSet: cntrs})
    }
            else {
                cntrs.push (target);
                this.setState ({checkedSet: cntrs});
            };

        //alert (cntrs);
    } 

    handleChange(event) {

        this.setState({price: event.target.value});
      }

    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        this.setState({ checkedSet: nextProps.cntr_numbers });
        this.forceUpdate()
      }

      handleSubmit (event) {
        event.preventDefault();
        var cntrs = this.state.checkedSet.slice();
        //alert (cntrs);
        var oneline = {
            cntrs: cntrs, 
            qty: event.target[2].value,
            curr: event.target[1].value,
            price: this.state.price,
            service: event.target[0].value
        }
        var curr = this.state.invContent.slice();
        curr.push (oneline);
        this.setState ({invContent: curr}); 
        // alert(this.state.invContent[0].curr);

         this.setState ({checkedSet: (this.props.cntr_numbers)});
         this.setState({price: 0});

      }

render () {
    //var cntrs=this.props.cntr_numbers.toString();
    //alert ("render")
    return (
        <div>
<Form onSubmit={this.handleSubmit} >
<Form.Row>
<Col>
{ this.props.cntr_numbers.map ((cntr, index) => 
    <div  key={index} className="mb-3">
      <Form.Check  
      label={cntr} 
      type='checkbox' 
      //defaultChecked={true}
      checked = {(this.state.checkedSet.includes(cntr))? true : false}
      //checked={this.state.checked} 
      onChange={this.handleInputChange}
      name={cntr}
      />
    </div>
)}
</Col>
<Col>
<Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Service</Form.Label>
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
<Form.Label>Curr</Form.Label>            
            <Form.Control as="select" custom>
                <option>EUR</option>
                <option>USD</option>
              </Form.Control>
            </Col>
            <Col>
            <Form.Label>Qty</Form.Label>
              <Form.Control placeholder={this.state.checkedSet.length}/>
            </Col>
            <Col>
            <Form.Label>Price</Form.Label>
              <Form.Control onChange={this.handleChange} placeholder='0.00'/>
            </Col>
            <Col>
            <Form.Label>Total</Form.Label>
              <Form.Control placeholder={this.state.price*this.state.checkedSet.length}/>
            </Col>
</Form.Row>
<Form.Row>
<Button variant="primary" type="submit" >
    Add
  </Button>
</Form.Row>
</Form>

    </div>
    )}}


export default CheckboxCntr