//форма вывода checkboxes + поле ввода инфо для счета и кнопка добавления строчек счета
// + Обработка кнопки выставить счет в PDF и БД через API(invoicing/Index)
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tableinv from './Tableinv'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class CheckboxCntr extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            price: 0,
            service: "Freight",
            curr: "EUR",
            checkedSet: (this.props.cntr_numbers),
            invContent: this.props.invoiceInfo[0].invContent,
            ourCo: "SeaLogic OY",
            client: (JSON.stringify(this.props.client)),
            apiResponce: (this.props.apiResponce),
            clientsList: (this.props.clientsList),
            sum: 0,
            invNumber: "",
            cl: 'cl3'
        };
        //var apiResponce=JSON.parse(this.props.apiResponce)

        this.handleChangeprice = this.handleChangeprice.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeservice = this.handleChangeservice.bind(this);
        this.handleChangecurr = this.handleChangecurr.bind(this);
        this.handleChangeClient = this.handleChangeClient.bind(this);
        
        this.InvoiceSubmit = this.InvoiceSubmit.bind(this);
        this.handleChangeourCo = this.handleChangeourCo.bind(this); 
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
      handleChangeourCo (event) {
        this.setState({ourCo: event.target.value});
      }
      handleChangeClient (event) {
        console.log (event.target.value)        
        this.setState({client: event.target.value});
      }

    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        this.setState({ checkedSet: nextProps.cntr_numbers });
        console.log ("checkbox state our co: " + nextProps.invoiceInfo[0].ourCompany);

        if (nextProps.invoiceInfo[0].invContent!==undefined) {
        let invContent = nextProps.invoiceInfo[0].invContent;
        let Content = [];
        invContent.forEach(element => {
          let serv = element.service.split(';');
          let oneline = {
          cntrs: element.cntrs,
          qty: element.qty,
          curr: element.curr,
          price: element.price,
          service: serv[0],
          }
          Content.push(oneline);
        });
        
        this.setState ({ourCo: nextProps.invoiceInfo[0].ourCompany})
        this.setState ({ invContent: Content})
        this.setState ({invNumber: nextProps.invoiceInfo[0].invNumber})
      }
      else{
        this.setState ({ invContent: []})
        this.setState ({invNumber: ""})
      }
        this.setState({client: nextProps.client})
        this.forceUpdate()

      }

      handleSubmit (event) {
        event.preventDefault();
        var cntrs = this.state.checkedSet.slice();
        var oneline = {
            cntrs: cntrs, 
            qty: this.state.checkedSet.length,
            curr: this.state.curr,
            price: this.state.price,
            service: this.state.service,
            //ourCo:this.state.OurCo,
            //client: this.state.client
        }
        if (this.state.invContent!=undefined){
        var curr = this.state.invContent.slice();}
        else {
          var curr = [];
        }
        curr.push (oneline);
        this.setState ({invContent: curr}); 
        this.forceUpdate();
        let sum = this.state.sum;
        this.setState ({sum: sum+this.state.price*this.state.checkedSet.length});
        console.log (this.state.sum)

         this.setState ({checkedSet: (this.props.cntr_numbers)});
         this.setState({price: 0});
      }

      async createPDF () {
        var invContent = this.state.invContent;
        invContent = invContent.filter(element => element !== null);
        //var client=JSON.stringify(this.state.client)
        var apiResponce=JSON.stringify(this.props.apiResponce);
        //var ourCo = JSON.stringify(this.state.OurCo)
      var cntr_numbers=JSON.stringify(this.props.cntrs_numbers)
        var cntr_numbers = this.props.cntr_numbers; 
        cntr_numbers={"cntrs": cntr_numbers}; 
        cntr_numbers = JSON.stringify (cntr_numbers);
        invContent=JSON.stringify(invContent);
        let response = await fetch("http://localhost:8000/test?invContent="+invContent + "&ourCo="+ this.state.ourCo +"&client="+this.state.client+ "&apiResponce="+apiResponce+"&cntr_numbers="+cntr_numbers+"&sum="+this.state.sum + "&invNumber="+this.state.invNumber);
        //  let response = await fetch("https://serene-beyond-29188.herokuapp.com/test?invContent="+invContent + "&ourCo="+ ourCo +"&client="+this.state.client+ "&apiResponce="+apiResponce+"&cntr_numbers="+cntr_numbers);
          let text= await response.json();
      }

      InvoiceSubmit (event) {
        //event.preventDefault();
        this.setState({sum: 0});
        this.createPDF();
        alert ("create invoice");
      }

      callbackFunction = (id) => { 
        var curr = this.state.invContent.slice();
        delete (curr[id]);
        this.setState ({invContent: curr}); 
      }

     

render () {

  let invoicebutton;
      if (this.state.invContent!=undefined && this.state.invContent.length>0) {
        if (this.state.invNumber==""){
        invoicebutton = <Button variant="success" onClick={this.InvoiceSubmit} > Issue Invoice</Button>}
        else {
        invoicebutton = <Button variant="warning" onClick={this.InvoiceSubmit} > Amend Invoice  {this.state.invNumber}</Button>}
        
      }

    let apiResponce = this.props.apiResponce;
    let firstline = "POL: " + apiResponce[0]["POL"];
    let secondline = "POD: " + apiResponce[0]["POD"];

    const leftColstyle = {
      backgroundColor: 'lightblue', 
      top: 0,
      bottom: 0
  }
  const content = {      
    maxWidth: '500'
}

//select value="Sealogoc OY" as="select"
var ourCo = this.state.ourCo;
var client = this.state.client.split(",");
client = client[2]; 
console.log(client);

    return (
        <div>
          
<Container> 

<Row>

  <Col md='2' style={leftColstyle}>
<Form >
<Form.Group  controlId="exampleForm.SelectCustom" >
            <Form.Label>Our Company </Form.Label>
              <Form.Control as="select" select value ={this.state.ourCo} onChange={this.handleChangeourCo}>
                <option>Sealogoc OY</option>
                <option>BP</option>

              </Form.Control>
            </Form.Group>

<Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Client </Form.Label>
              <Form.Control as="select" select value ={this.state.client} onChange={this.handleChangeClient}>
                {this.props.clientsList.map ((client, index)=>
                <option value = {client._id+"," + client.name +"," + client.address} key={index}> {client.name} </option>
                ) }
              </Form.Control>
            </Form.Group>
</Form>
<Form.Control plaintext readOnly value ={firstline} />
<Form.Control plaintext readOnly value ={secondline} />
</Col>

<Col md='10'>
<Form  onSubmit={this.handleSubmit} >
<Form.Row>
<Col >
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

</Col>
</Row>
<Row>
  <Col md='2' style={leftColstyle}>
{ this.props.cntr_numbers.map ((cntr, index) => 
    <div  key={index} className="mb-3">
      <Form.Check  
      label={cntr} 
      type='checkbox' 
      checked = {(this.state.checkedSet.includes(cntr))? true : false}
      onChange={this.handleInputChange}
      name={cntr}
      />
    </div>
)}
</Col>

<Col md='10'>
<div style = {content}>
<Tableinv invContent={this.state.invContent} updateInvContent={this.callbackFunction} />

</div>
{invoicebutton}
</Col>


</Row>
</Container>
    </div>

    
    
    )}}


export default CheckboxCntr