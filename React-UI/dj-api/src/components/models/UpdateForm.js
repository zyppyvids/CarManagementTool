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
import { API_URL_CARMODELS, options } from '../../constants';

class UpdateFormML extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            updatedModel: "",
            id: "",
            model: "",
            year: "",
            makeid: "",
            formErrors: {model: '', year: '', makeid: ''},
            modelValid: false,
            yearValid: false,
            makeidValid: false,
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
            var requestLink = API_URL_CARMODELS + this.state.id;
            
            // JSON Body build
            var jsonBody = "{";

            if(this.state.model)
                jsonBody += ("\"model\": ".concat("\"", this.state.model, "\","));
            if(this.state.year)
                jsonBody += ("\"year\": ".concat("\"", this.state.year, "\","));
            if(this.state.makeid)
                jsonBody += ("\"carmakeid_id\": ".concat("\"", this.state.makeid, "\","));
            
            // Removes last ',' if there is one
            if(jsonBody.charAt(jsonBody.length - 1) === ',')
                jsonBody = jsonBody.slice(0, -1);
            
            jsonBody += "}";
            
            // Updates the requested object then gets it by its id and displays it to the user
            // get is in the put's then clause because we want to ensure these steps are one after the other
            axios.put(requestLink, jsonBody, options).then(() => axios.get(requestLink, options).then(res => this.setState({ updatedModel: res.data, isSubmitted: true })));
        }
    }

    handleOkClick() {
        this.setState(({
          isSubmitted: false,
          updatedModel: "",
          id: "",
          model: "",
          year: "",
          makeid: ""
        }));
    }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let modelValid = this.state.modelValid;
        let yearValid = this.state.yearValid;
        let makeidValid = this.state.makeidValid;
      
        switch(fieldName) {
          case 'model':
            modelValid = value != "";
            fieldValidationErrors.model = modelValid ? '' : ' should not be null! \u26A0';
            break;
          case 'year':
            yearValid = value != "";
            fieldValidationErrors.year = yearValid ? '' : ' should not be null! \u26A0';
            break;
          case 'makeid':
            makeidValid = value != "";
            fieldValidationErrors.makeid = makeidValid ? '' : ' should not be null! \u26A0';
          default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        modelValid: modelValid,
                        yearValid: yearValid,
                        makeidValid: makeidValid
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.modelValid && this.state.yearValid && this.state.makeidValid});
    }

    render() {
        if(!this.state.isSubmitted) {
            return (
                <Container>
                <h1 className="coloured" style={{textAlign:'center'}}>-update-</h1>
                <h5 style={{textAlign:'center', color:'gray'}}>update a given model in the DB by its ID/Model/Year</h5>
                
                <div className="panel panel-default" style={{textAlign:"center"}}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formGroup">
                    <Col sm="3">
                        <FloatingLabel label="Enter Model's ID">
                        <Form.Control type="text" placeholder="0" name="id" onChange={this.handleChange} />
                        </FloatingLabel>
                    </Col>

                    <Col sm="3">
                        <FloatingLabel label="Enter Model's Model">
                        <Form.Control type="text" placeholder="0" name="model" onChange={this.handleChange} />
                        </FloatingLabel>
                    </Col>

                    <Col sm="3">
                        <FloatingLabel label="Enter Model's Year">
                        <Form.Control type="text" placeholder="0" name="year" onChange={this.handleChange} />
                        </FloatingLabel>
                    </Col>

                    <Col sm="3">
                        <FloatingLabel label="Enter Model's Make ID">
                        <Form.Control type="text" placeholder="0" name="makeid" onChange={this.handleChange} />
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
                            <th>VIN</th>
                            <th>Car Plate</th>
                            <th>Model ID</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key="1">
                                <td>{this.state.updatedModel.id}</td>
                                <td>{this.state.updatedModel.model}</td>
                                <td>{this.state.updatedModel.year}</td>
                                <td>{this.state.updatedModel.carmakeid_id}</td>
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

export default UpdateFormML;