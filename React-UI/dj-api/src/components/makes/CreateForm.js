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
import { options, API_URL_CARMAKES_CREATE } from '../../constants';

class CreateFormMK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            name: "",
            createdMake: "",
            formErrors: {name: ''},
            nameValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => { this.validateField(e.target.name, e.target.value) });
    }

    handleCreateClick(e) {
        e.preventDefault();
        if(this.state.formValid) {
            // JSON Body build
            var jsonBody = "{";

            if(this.state.name)
                jsonBody += ("\"name\": ".concat("\"", this.state.name, "\","));

            // Removes last ',' if there is one
            if(jsonBody.charAt(jsonBody.length - 1) === ',')
                jsonBody = jsonBody.slice(0, -1);
            
            jsonBody += "}";
            
            axios.post(API_URL_CARMAKES_CREATE, jsonBody, options).then(res => this.setState({ createdMake: res.data, isSubmitted: true }));
        }
    }

    handleOkClick() {
        this.setState(({
            isSubmitted: false,
            name: "",
            createdMake: "",
            formErrors: {name: ''},
            nameValid: false,
            formValid: false
        }));
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
      
        switch(fieldName) {
          case 'name':
            nameValid = value != "";
            fieldValidationErrors.VIN = nameValid ? '' : ' should not be null! \u26A0';
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
            <h1 style={{textAlign:'center', color:'rgb(40, 150, 250)'}}>-create-</h1>
            <h5 style={{textAlign:'center', color:'gray'}}>create a make by its Name</h5>
    
            <div className="panel panel-default" style={{textAlign:"center"}}>
                <FormErrors formErrors={this.state.formErrors} />
            </div>

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formGroup">
                <Col sm="12">
                    <FloatingLabel label="Enter Make's Name">
                    <Form.Control type="text" placeholder="0" name="name" onChange={this.handleChange}/>
                    </FloatingLabel>
                </Col>
                </Form.Group>

                <br/>
                <Form.Group as={Row} className="mb-3">
                    <Button variant="info" style={{backgroundColor:'rgb(40, 150, 250)', borderColor:'black'}} onClick={this.handleCreateClick}>Create</Button>
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
                            <td>{this.state.createdMake.id}</td>
                            <td>{this.state.createdMake.name}</td>
                        </tr>
                    </tbody>
                </Table>
                <br/>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Button variant="info" style={{backgroundColor:'rgb(40, 150, 250)', borderColor:'black'}} onClick={this.handleOkClick}>OK!</Button>
                    </Form.Group>
                </Form>
            </div>
        );        
    }
}
    
}

export default CreateFormMK;