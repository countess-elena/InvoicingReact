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
          resp: null
        }

        this.Invoices(); 
  }

  async Invoices () {
    //let response = await fetch ("http://serene-beyond-29188.herokuapp.com/getInvoices");
    let response = await fetch ("http://localhost:8000/getInvoices");
    let text= await response.text();;
    text=JSON.parse (text); 
    
    let newtext = this.state.resp;
    //newtext.push(text)
    this.setState({resp: text}); 
    console.log(this.state.resp);
}


  formatDate(date) {
    var date = new Date (date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return day + "." + month + "."  + year;
    }

    render () {
    let content=[];
    if (this.state.resp!=null) {
      content = this.state.resp
    }

        return (
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Invoice number</th>
      <th>Date</th>
      <th>Client</th>
      <th>SUM</th>
    </tr>
  </thead>
  <tbody>
          {content.map((invoice, index) =>

    <tr key={index}>
      <td>{invoice.invNumber}</td>
      <td>{this.formatDate(invoice.date)}</td>
      <td>{invoice.client.name}</td>
          <td>{invoice.sum}</td>
    </tr>
          )}
  </tbody>
</Table>
        )}
        }
export default Invoices; 
