//начальный страница сайта
import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckboxCntr from './CheckboxCntrs';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import NewClient from './NewClient';
import Invoices from './Invoices';

class Formel extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        apiResponce: [{}],
        cntr_numbers: [],
        booking_no: "",
        price: '',
        invContent: [],
        key: 'home',
        clientsList: []
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {

      this.setState({booking_no: event.target.value});
    }
    
  //вызов функции поиска инфо по букингу
    handleSubmit(event) {
      
        event.preventDefault();

      this.callAPI(); 
      this.getClientsList()
    }
//поиск инфо по номеру букинга (с сервера: 2000 - API: Invoicing/index.js)
//загружаем инфо из excel файла imp/exp bookings в json и затем получаеи инфо по букингу из таблицы
    async callAPI() {
        var booking_no = this.state.booking_no;
        console.log(booking_no);
        let response = await fetch("http://localhost:2000/xlstojson?booking="+booking_no);
        let text= await response.json();
        console.log (text);
        this.setState.booking_no = booking_no;
        var curr = []; 
        text.forEach ((item)=> {
            console.log (item.cntr_number);  
                  
            curr.push(item.cntr_number);
        })
        this.setState({cntr_numbers: curr}); 

        console.log(this.state.cntr_numbers);
        this.setState({apiResponce: text});
  }

  async getClientsList () {
    let response = await fetch("http://localhost:2000/clientList");
      let text= await response.json();
      this.setState({clientsList: text})
      console.log(text);
  return text
}
  
    render() {
      let checkbox;
      if (this.state.cntr_numbers.length>0) {
        checkbox = <CheckboxCntr cntr_numbers={this.state.cntr_numbers} apiResponce={this.state.apiResponce} clientsList={this.state.clientsList} />
      }
      else {checkbox=""};

      const content = {
        borderLeft: '6px solid red',
        backgroundColor: 'lightblue',       
        marginLeft: 250 
    }      
      return (

        <Tabs
      id="controlled-tab-example"
      activeKey={this.state.key}
      onSelect={(k) => this.setState({key: k})} >
      <Tab eventKey="Home" title="Issue Invoice">
      <React.Fragment >
        <form onSubmit={this.handleSubmit} style={content}>
        <label>
            Pls enter booking number: 
            <input type="text"  value={this.state.booking_no} onChange={this.handleChange}/>
          </label>

          <input type="submit" value="Submit"/>
        </form>

        <div>
        {checkbox}
        </div>

       <p> responce: {JSON.stringify(this.state.apiResponce)}</p>
        </React.Fragment>
      </Tab>
      <Tab eventKey="Tab2" title="New Client">
        <NewClient/> 
      </Tab>
      <Tab eventKey="Tab3" title="Invoices & Payments">
      <Invoices/>
      </Tab>
    </Tabs>
  );
}
         
    
    
  }
export default Formel;
