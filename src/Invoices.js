import React from 'react';
import App from './App';
import CheckboxCntr from './CheckboxCntrs';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Papaparse from 'papaparse' 
import download from 'downloadjs';


class Invoices extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
          resp: null,
          invoiceInfo:""
        }

        this.Invoices(); 

        this.download = this.download.bind(this);
        this.handleClick = this.handleClick.bind(this);
  }

  async Invoices () {
    //let response = await fetch ("http://serene-beyond-29188.herokuapp.com/getInvoices");
    let response = await fetch ("http://localhost:8000/getInvoices", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
  }
    });
    let text= await response.text();
    text=JSON.parse (text); 
    
    let newtext = this.state.resp;
    //newtext.push(text)
    this.setState({resp: text}); 
    console.log(this.state.resp);
}

handleClick(event){
  console.log (event.target.value);
  let invNumber = event.target.value;

  console.log('clicked');
  this.oneInvoice(invNumber);
  console.log(this.state.invoiceInfo);

}

async oneInvoice (invNumber){
  let res = await fetch ("http://localhost:8000/oneInvoice?invNumber="+invNumber,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
}
  });
  let text= await res.json();
  //text=JSON.parse (text); 
  console.log("text: "+text);
  this.setState({invoiceInfo: text});
  this.props.updateData(this.state.invoiceInfo)
  //return text;
}

async download () {
  const res = await fetch ("http://localhost:8000/dowloadInvoices", {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
}
  });
  //console.log(res.blob())
 const blob = await res.blob();
  //console.log(blob);
  download (blob, "invoices_list.csv");

  //let file = await response.text();
  console.log ('done')
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
          <div>
          <Button onClick={this.download} variant="info">выгрузка счетов</Button>   
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Invoice number</th>
      <th>Date</th>
      <th>Client</th>
      <th>SUM</th>
      <th>Payment Date</th>
    </tr>
  </thead>
  <tbody>
          {content.map((invoice, index) =>

    <tr key={index}>
      <td><Button variant='link' value={invoice.invNumber} onClick={this.handleClick}>{invoice.invNumber}</Button></td>
      <td>{this.formatDate(invoice.date)}</td>
      <td>{invoice.client.name}</td>
      <td>{invoice.sum}</td>
          <td>{invoice.paymentDate>0 ? this.formatDate(invoice.paymentDate):"not paid"}</td>
    </tr>
          )}
  </tbody>
</Table>
     </div>
        
        )}
        }
export default Invoices; 
