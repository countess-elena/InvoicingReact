import React from 'react';
import App from './App';
import CheckboxCntr from './CheckboxCntrs';
//import { upload } from './Bookingsearch';

class Formel extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        apiResponce: [],
        cntr_numbers: [],
        booking_no: "",
        price: ''
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    
  
    handleChange(event) {

      this.setState({booking_no: event.target.value});
    }
    
  
    handleSubmit(event) {
        event.preventDefault();
      alert('A name was submitted: ' + this.state.booking_no);
      this.callAPI(); 
      
    }

    async callAPI() {

        var url = this.state.booking_no;
        console.log(url);
        
        //let response = await fetch("http://localhost:2000/test");
        let response = await fetch("http://localhost:2000/xlstojson?booking="+url);
        let text= await response.json();
        console.log (text);
        //text=JSON.parse (text);
        //console.log (text);
        this.setState.booking_no = url;

        text.forEach ((item)=> {
            console.log (item.cntr_number);  
            //this.setState.price= 
            var curr = this.state.cntr_numbers;        
            curr.push(item.cntr_number);
            this.setState.cntr_numbers = curr; 
        });
        console.log(this.state.cntr_numbers);
        //this.setState({apiResponce: text});
        this.setState({apiResponce: JSON.stringify(text)});
    }
/*
    componentDidMount() {
        this.callAPI();
  } */
  
    render() {
      var cntrs = this.state.cntr_numbers;
      return (
          <React.Fragment>
        <form onSubmit={this.handleSubmit}>
        <label>
            Name:
            <input type="text"  value={this.state.booking_no} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <App name = {this.state.apiResponce} cntr_numbers={this.state.cntr_numbers} booking_no={this.state.booking_no}/>
        responce + {this.state.apiResponce}

        <CheckboxCntr cntr_numbers={cntrs}/>
        </React.Fragment>
      );
    }
  }

//export nameform; 
export default Formel;
