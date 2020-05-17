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
        var cntrs=props.cntr_numbers;
        //alert (cntrs)
        var cntrs = [];
        this.state = {
            //checked: {[cntr]:true},
            checkedSet: (this.props.cntr_numbers)
        };

       // cntr_nos = this.props.cntr_numbers;
        this.handleInputChange = this.handleInputChange.bind(this);
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

    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        this.setState({ checkedSet: nextProps.cntr_numbers });
      }

//    static getDerivedStateFromProps(props, state) {
  //      return  {checkedSet: props.cntr_numbers};     }

render () {
    var cntrs=this.props.cntr_numbers.toString();
    //alert (cntrs)
    return (
        <div>
<Form.Row>
<Col>
{ this.props.cntr_numbers.map ((cntr, index) => 
    <div  key={index} className="mb-3">
      <Form.Check  
      label={cntr} 
      type='checkbox' 
      defaultChecked
      checked={this.state.checked} 
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
              <Form.Control placeholder='0.00'/>
            </Col>
            <Col>
            <Form.Label>Total</Form.Label>
              <Form.Control placeholder='0.00'/>
            </Col>
</Form.Row>
    </div>



    )}}


export default CheckboxCntr