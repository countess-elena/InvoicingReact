import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function NewClient () {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [bank, setBank] = useState("");
    const [ourClient, setOurClient] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        var namecur = {name};
        var myobj = {clName: name, 
            clAddress: address, 
            clBank: bank,
            clourClient: ourClient

        }

        myobj=JSON.stringify (myobj)
        console.log (myobj);



        let response = await fetch("http://localhost:2000/newClient?myobj="+myobj);
        let text= await response.text();
        alert("Client " + name + " is created " + text);

        setName ("");
        setAddress("");
        setBank("");
        setOurClient ("")
    }

    

        return (
        <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Client Name </Form.Label>
    <Form.Control  value = {name} type="text" onChange={e => setName(e.target.value)}/>
  </Form.Group>
  
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="address" onChange={e => setAddress(e.target.value)}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Bank</Form.Label>
    <Form.Control type="text" placeholder="bank" onChange={e => setBank(e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Our Client</Form.Label>
    <Form.Control type="text" placeholder="ourClient"  onChange={e => setOurClient(e.target.value)}/>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        )
}
export default NewClient; 