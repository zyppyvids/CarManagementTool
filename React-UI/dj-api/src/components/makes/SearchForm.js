import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { API_URL_CARMAKES, QUERYCHAR, ANDCHAR, API_ID, API_NAME, options } from '../../constants';

class SearchFormMK extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSubmitted: false,
        makes: [],
        id: "",
        name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearchClick(e) {
    e.preventDefault();
    
    var requestLink = API_URL_CARMAKES.slice(0, -1) + QUERYCHAR;
    
    if(this.state.id)
      requestLink += (ANDCHAR + API_ID + this.state.id);
    if(this.state.name)
      requestLink += (ANDCHAR + API_NAME + this.state.name);

    axios.get(requestLink, options).then(res => this.setState({ makes: res.data, isSubmitted: true }));
  }

  handleOkClick() {
    this.setState(({
      isSubmitted: false,
      makes: [],
      id: "",
      name: ""
    }));
  }
   
  render() {
    if(!this.state.isSubmitted) {
      return (
        <Container>
          <h1 style={{textAlign:'center', color:'turquoise'}}>-search-</h1>
          <h5 style={{textAlign:'center', color:'gray'}}>search for a given make in the DB by its ID/VIN/Car Plate</h5>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col sm="6">
                <FloatingLabel label="Enter Make's ID">
                  <Form.Control type="text" placeholder="0" name="id" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>

              <Col sm="6">
                <FloatingLabel label="Enter Make's Name">
                  <Form.Control type="text" placeholder="0" name="VIN" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>
            </Form.Group>
            
            <br/>
            <Form.Group as={Row} className="mb-3">
                <Button variant="info" style={{backgroundColor:'turquoise', borderColor:'black'}} onClick={this.handleSearchClick}>Search</Button>
            </Form.Group>
          </Form>
        </Container>
      );
    } 
    else {
      return (
        <div style={{ paddingLeft: 15, paddingRight: 15, maxHeight: '80%', textAlign: 'center' }}>
          <Table responsive={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {this.state.makes.map(( currMake, index ) => {
              return (
              <tr key={index}>
                <td>{currMake.id}</td>
                <td>{currMake.name}</td>
              </tr>
              );
            })}
            </tbody>
          </Table>
          <br/>
          <Form>
            <Form.Group as={Row} className="mb-3">
                <Button variant="info" style={{backgroundColor:'turquoise', borderColor:'black'}} onClick={this.handleOkClick}>OK!</Button>
            </Form.Group>
          </Form>
        </div>
      );
    }
  }
       
}

export default SearchFormMK;