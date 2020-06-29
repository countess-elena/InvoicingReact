import React from 'react';
import App from './App';
import CheckboxCntr from './CheckboxCntrs';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


class Tableinv extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
          invContent: (this.props.invContent)
        }

      this.DeleteRow = this.DeleteRow.bind(this); 
    }

    componentWillReceiveProps(nextProps) {
      // This will erase any local state updates!
      // Do not do this.
      this.setState({ invContent: nextProps.invContent });
      this.forceUpdate()
    }
    DeleteRow (event) {
      event.preventDefault();
      var id= event.target.id;
      this.props.updateInvContent(id);
    }


returntable (){
  const content = {
    //position: 'relative',          
    //marginLeft: 220,
    //flexWrap: 'wrap'
    wordBreak: 'break-all',
    width: 400
}
  if (this.state.invContent!=undefined && this.state.invContent.length>0) {
  return (
    <div>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Cntr nos</th>
      <th>Service</th>
      <th>Currency</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
  { this.state.invContent.map ((line, index) => 
    <tr key= {index}>
<td>{index+1}</td>
<td style={content}>{line["cntrs"]}</td>
<td>{line["service"]}</td>
<td>{line["curr"]}</td>
<td>{line["qty"]}</td>
<td>{line["price"]}</td>
  <td>{line["price"]*line["qty"]}</td>
  <td> <Button id={index} variant="outline-danger" onClick={this.DeleteRow} >X</Button> </td>
  </tr>
  )}
  </tbody>
</Table>
</div>
  )
}
return null}

render () {
return (
this.returntable()
)
}

}
export default Tableinv
