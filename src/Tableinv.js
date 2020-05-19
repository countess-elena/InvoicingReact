import React from 'react';
import App from './App';
import CheckboxCntr from './CheckboxCntrs';
import Table from 'react-bootstrap/Table'


class Tableinv extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
          invContent: (this.props.invContent)
        }
       
    }

    componentWillReceiveProps(nextProps) {
      // This will erase any local state updates!
      // Do not do this.
      this.setState({ invContent: nextProps.invContent });
      this.forceUpdate()
    }


returntable (){
  if (this.props.invContent.length==0) {
    return ("nothing to return")
  }
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
<td>{line["cntrs"]}</td>
<td>{line["service"]}</td>
<td>{line["curr"]}</td>
<td>{line["qty"]}</td>
<td>{line["price"]}</td>
  <td>{line["price"]*line["qty"]}</td>
    </tr>
  )}
  </tbody>
</Table>
</div>
  )
}

render () {
return (
this.returntable()
)

}

}
export default Tableinv
