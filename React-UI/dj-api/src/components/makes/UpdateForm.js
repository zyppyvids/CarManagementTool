import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { FormErrors } from '../FormErrors';
import { API_URL_CARMAKES, options } from '../../constants';

class UpdateFormMK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            updatedMake: "",
            id: "",
            name: "",
            formErrors: {name: ''},
            nameValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => this.validateField(e.target.name, e.target.value));
    }

    handleUpdateClick(e) {            
        e.preventDefault();
            
        if(this.state.formValid) {
            var requestLink = API_URL_CARMAKES + this.state.id;
            
            // JSON Body build
            var jsonBody = "{";

            if(this.state.name)
                jsonBody += ("\"name\": ".concat("\"", this.state.name, "\","));
            
            // Removes last ',' if there is one
            if(jsonBody.charAt(jsonBody.length - 1) === ',')
                jsonBody = jsonBody.slice(0, -1);
            
            jsonBody += "}";

            // Updates the requested object then gets it by its id and displays it to the user
            // get is in the put's then clause because we want to ensure these steps are one after the other
            axios.put(requestLink, jsonBody, options).then(() => axios.get(requestLink, options).then(res => this.setState({ updatedMake: res.data, isSubmitted: true })));
        }
    }

    handleOkClick() {
        this.setState(({
          isSubmitted: false,
          updatedMake: "",
          id: "",
          name: ""
        }));
    }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
      
        switch(fieldName) {
          case 'name':
            nameValid = value != "";
            fieldValidationErrors.name = nameValid ? '' : ' should not be null! \u26A0';
            break;
          default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        nameValid: nameValid
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.nameValid});
    }

    render() {
        if(!this.state.isSubmitted) {
            return (
                <Container>
                <h1 style={{textAlign:'center', color:'plum'}}>-update-</h1>
                <h5 style={{textAlign:'center', color:'gray'}}>update a given make in the DB by its ID/Name</h5>
                
                <div className="panel panel-default" style={{textAlign:"center"}}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formGroup">
                    <Col sm="6">
                        <FloatingLabel label="Enter Make's ID">
                        <Form.Control type="text" placeholder="0" name="id" onChange={this.handleChange} />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6">
                        <FloatingLabel label="Enter Make's Name">
                        <Form.Control type="text" placeholder="0" name="name" onChange={this.handleChange} />
                        </FloatingLabel>
                    </Col>
                    </Form.Group>
                    
                    <br/>
                    <Form.Group as={Row} className="mb-3">
                        <Button variant="info" style={{backgroundColor:'plum', borderColor:'black'}} onClick={this.handleUpdateClick}>Update</Button>
                    </Form.Group>
                </Form>
                </Container>
            );
        }
        else {
            return (
                <div style={{paddingLeft: 15, paddingRight: 15, textAlign: 'center'}}>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key="1">
                                <td>{this.state.updatedMake.id}</td>
                                <td>{this.state.updatedMake.name}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br/>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Button variant="info" style={{backgroundColor:'plum', borderColor:'black'}} onClick={this.handleOkClick}>OK!</Button>
                        </Form.Group>
                    </Form>
                </div>
            );        
        }
    }  
}

export default UpdateFormMK;