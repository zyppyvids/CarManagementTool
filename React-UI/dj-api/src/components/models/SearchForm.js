import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { API_URL_CARMODELS, QUERYCHAR, ANDCHAR, API_ID, API_VIN, API_CARPLATE, options, API_MODEL, API_YEAR } from '../../constants';

class SearchFormML extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSubmitted: false,
        models: [],
        id: "",
        model: "",
        year: ""
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
    
    var requestLink = API_URL_CARMODELS.slice(0, -1) + QUERYCHAR;
    
    if(this.state.id)
      requestLink += (ANDCHAR + API_ID + this.state.id);
    if(this.state.model)
      requestLink += (ANDCHAR + API_MODEL + this.state.model);
    if(this.state.year)
      requestLink += (ANDCHAR + API_YEAR + this.state.year);

    axios.get(requestLink, options).then(res => this.setState({ models: res.data, isSubmitted: true }));
  }

  handleOkClick() {
    this.setState(({
      isSubmitted: false,
      models: [],
      id: "",
      model: "",
      year: ""
    }));
  }
   
  render() {
    if(!this.state.isSubmitted) {
      return (
        <Container>
          <h1 style={{textAlign:'center', color:'turquoise'}}>-search-</h1>
          <h5 style={{textAlign:'center', color:'gray'}}>search for a given model in the DB by its ID/Model Name/Year</h5>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col sm="4">
                <FloatingLabel label="Enter Model's ID">
                  <Form.Control type="text" placeholder="0" name="id" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>

              <Col sm="4">
                <FloatingLabel label="Enter Model's Model">
                  <Form.Control type="text" placeholder="0" name="model" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>

              <Col sm="4">
                <FloatingLabel label="Enter Model's Year">
                  <Form.Control type="text" placeholder="0" name="year" onChange={this.handleChange} />
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
                <th>Model</th>
                <th>Year</th>
                <th>Make ID</th>
              </tr>
            </thead>
            <tbody>
            {this.state.models.map(( currMod, index ) => {
              return (
              <tr key={index}>
                <td>{currMod.id}</td>
                <td>{currMod.model}</td>
                <td>{currMod.year}</td>
                <td>{currMod.carmakeid_id}</td>
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

export default SearchFormML;