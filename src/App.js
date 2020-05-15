
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Inputform from './Inputform';
import ToggleButton from 'react-bootstrap/ToggleButton'

//this is testing of sidebar

const App = (props) =>{
  const [count, setCount] = useState(1);
  const [listForms, setList] = useState([1]); 

  //let Button = null;
  var seccount=count; 
  //var newel = React.createElement (<Inputform/>)

  return (
    <div className="App">
      <header className="App-header"> </header>

        <div>  
        <label> booking Number: <input type='text' value = {props.booking_no}/> </label> </div>
        
        <Form onSubmit={handleSubmit}>
          <p>       
          

          { listForms.map ((form, index) => 
            <Inputform key={index}/>)
          }
          </p>
          
            
        <div>
          <Button variant="primary" type="submit" > Submit </Button>
          <Button variant="info" onClick= {HandleChange} >+</Button>
          <Button variant="info" onClick= {HandleDelete} >-</Button>
        </div>
        </Form>
      </div>  
  );
  function HandleChange (event){
    var newlist = listForms; 
    listForms.push(1);
    setCount(count + 1);
  };
    
    function handleSubmit (event, value) {
      event.preventDefault();
      alert ('handleSubmit')
      }

      function HandleDelete () {
        listForms.pop();
        setList(listForms); 
        setCount(count - 1);
        
      }
    
}
export default App;
