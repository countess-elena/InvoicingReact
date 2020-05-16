import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Formel from './Formelement';

class CheckboxCntr extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            checked: true
        };

       // cntr_nos = this.props.cntr_numbers;
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange (event) {
        const target = event.target.name;
        this.setState(
            { checked: !this.state.checked }
        )
        alert (this.state.checked);
    } 

render () {
    return (
        <div>cntr nos fm props:  {this.props.cntr_numbers.toString()}

{ this.props.cntr_numbers.map ((cntr, index) => 
    <Form key={index}>
    <div key='default-checkbox' className="mb-3">
      <Form.Check 
      label={cntr} 
      type='checkbox' 
      checked={this.state.checked} 
      onChange={this.handleInputChange}
      name='cntr1'
      />

    </div>
    </Form>
)}
    </div>

    )}}


export default CheckboxCntr