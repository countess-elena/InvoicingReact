import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tableinv from './Tableinv'
import Col from 'react-bootstrap/Col'

class CheckboxCntr extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            price: 0,
            service: "Freight",
            curr: "EUR",
            checkedSet: (this.props.cntr_numbers),
            //qty: checkedSet.length,
            invContent: []
        };

        this.handleChangeprice = this.handleChangeprice.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeservice = this.handleChangeservice.bind(this);
        this.handleChangecurr = this.handleChangecurr.bind(this);
        this.InvoiceSubmit = this.InvoiceSubmit.bind(this);
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

    handleChangeprice(event) {
        this.setState({price: event.target.value});
      }

      handleChangecurr(event) {
        this.setState({curr: event.target.value});
      }

      handleChangeservice(event) {
        this.setState({service: event.target.value});
      }

    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        this.setState({ checkedSet: nextProps.cntr_numbers });
        this.setState ({ invContent: []})
        this.forceUpdate()

      }

      handleSubmit (event) {
        event.preventDefault();
        var cntrs = this.state.checkedSet.slice();
        //alert (cntrs);
        var oneline = {
            cntrs: cntrs, 
            qty: this.state.checkedSet.length,
            curr: this.state.curr,
            price: this.state.price,
            service: this.state.service
        }
        var curr = this.state.invContent.slice();
        curr.push (oneline);
        this.setState ({invContent: curr}); 
        this.forceUpdate();

         this.setState ({checkedSet: (this.props.cntr_numbers)});
         this.setState({price: 0});
      }

      async createPDF () {
        var invContent = this.state.invContent;
        var apiResponce=this.props.apiResponce;
        //var cntr_numbers=JSON.stringify(this.props.cntrs_numbers)
        var cntr_numbers = this.props.cntr_numbers; 
        cntr_numbers={"cntrs": cntr_numbers}; 
        cntr_numbers = JSON.stringify (cntr_numbers);
        invContent=JSON.stringify(invContent);
          let response = await fetch("http://localhost:2000/test?invContent="+invContent + "&apiResponce="+apiResponce+"&cntr_numbers="+cntr_numbers);
          let text= await response.json();
      }

      InvoiceSubmit (event) {
        //event.preventDefault();
        this.createPDF();
        alert ("create invoice");
      }


render () {
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
              <Form.Control as="select" custom onChange={this.handleChangeservice}>
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
            <Form.Control as="select" custom onChange= {this.handleChangecurr}>
                <option>EUR</option>
                <option>USD</option>
              </Form.Control>
            </Col>
            <Col>
            <Form.Label>Qty</Form.Label>
              <Form.Control value={this.state.checkedSet.length}/>
            </Col>
            <Col>
            <Form.Label>Price</Form.Label>
              <Form.Control value={this.state.price } onChange={this.handleChangeprice} />
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

<Tableinv invContent={this.state.invContent}/>

<Button variant="success" onClick={this.InvoiceSubmit} > Issue Invoice</Button>
    </div>
    
    )}}


export default CheckboxCntr