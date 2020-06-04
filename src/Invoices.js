import React from 'react';
import App from './App';
import CheckboxCntr from './CheckboxCntrs';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


class Invoices extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
          resp: []
        }

        this.Invoices(); 
  }

  async Invoices () {
    let response = await fetch ("http://localhost:2000/getInvoices");
    let text= await response.text();
    text=JSON.parse (text); 
    
    
    this.setState({resp: text}); 
    console.log(this.state.resp);
}
    render () {
     let content = this.state.resp;

        return (
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Invoice number</th>
      <th>Date</th>
      <th>Client</th>
      <th>SUM</th>
    </tr>
  </thead>
  <tbody>
          {content.map((invoice, index) =>

    <tr key={index}>
      <td>1</td>
      <td>{invoice.invNumber}</td>
      <td>{invoice.date}</td>
      <td>{invoice.client}</td>
      <td>sum</td>
    </tr>
          )}
  </tbody>
</Table>
        )}
        }
export default Invoices; 
