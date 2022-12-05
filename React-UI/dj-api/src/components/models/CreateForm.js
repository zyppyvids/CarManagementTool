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
import { API_URL_CARMAKES_GETALL, options, API_URL_CARMODELS_CREATE } from '../../constants';

class CreateFormML extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makes: [],
            isLoading: true,
            isSubmitted: false,
            model: "",
            year: "",
            makeid_id: "",
            createdModel: "",
            formErrors: {model: '', year: ''},
            modelValid: false,
            yearValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    componentDidMount() {
        axios.get(API_URL_CARMAKES_GETALL, options).then(res => this.setState({ makes: res.data, makeid_id: (res.data.length === 0 ? "" : res.data[0].id), isLoading: false })).catch((error) => {
            console.log(error);
            this.setState({isLoading: false});
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => { this.validateField(e.target.name, e.target.value) });
    }

    handleSelectChange(e) {
        this.setState({ makeid_id: e.target.value });
    }

    handleCreateClick(e) {
        e.preventDefault();
        if(this.state.formValid) {
            // JSON Body build
            var jsonBody = "{";

            if(this.state.model)
                jsonBody += ("\"model\": ".concat("\"", this.state.model, "\","));
            if(this.state.year)
                jsonBody += ("\"year\": ".concat("\"", this.state.year, "\","));
            if(this.state.makeid_id)
                jsonBody += ("\"carmakeid_id\": ".concat(this.state.makeid_id));

            // Removes last ',' if there is one
            if(jsonBody.charAt(jsonBody.length - 1) === ',')
                jsonBody = jsonBody.slice(0, -1);
            
            jsonBody += "}";
            
            axios.post(API_URL_CARMODELS_CREATE, jsonBody, options).then(res => this.setState({ createdModel: res.data, isSubmitted: true }));
        }
    }

    handleOkClick() {
        this.setState(({
            isSubmitted: false,
            model: "",
            year: "",
            makeid_id: "",
            createdModel: "",
            formErrors: {model: '', year: '', makeid: ''},
            modelValid: false,
            yearValid: false,
            formValid: false
        }));
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let modelValid = this.state.modelValid;
        let yearValid = this.state.yearValid;
      
        switch(fieldName) {
          case 'model':
            modelValid = value != "";
            fieldValidationErrors.model = modelValid ? '' : ' should not be null! \u26A0';
            break;
          case 'year':
            yearValid = value != "";
            fieldValidationErrors.year = yearValid ? '': ' should not be null! \u26A0';
            break;
          default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        modelValid: modelValid,
                        yearValid: yearValid
                      }, this.validateForm);
    }
      
    validateForm() {
    this.setState({formValid: this.state.modelValid && this.state.yearValid});
    }

    render() {
    const { makes } = this.state;

	let makesList = makes.length > 0
		&& makes.map((item, iterator) => {
		return (
			<option key={iterator} value={item.id}>{item.name}</option>
		)
	}, this);
    if(!this.state.isLoading) {
        if(!this.state.isSubmitted) {
            return (
                <Container>
                <h1 className="coloured" style={{textAlign:'center'}}>-create-</h1>
                <h5 style={{textAlign:'center', color:'gray'}}>create a model by its Model/Name/Car Make</h5>
      
                <div className="panel panel-default" style={{textAlign:"center"}}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formGroup">
                    <Col sm="4">
                        <FloatingLabel label="Enter Model's Model">
                        <Form.Control type="text" placeholder="0" name="model" onChange={this.handleChange}/>
                        </FloatingLabel>
                    </Col>

                    <Col sm="4">
                        <FloatingLabel label="Enter Model's Year">
                        <Form.Control type="text" placeholder="0" name="year" onChange={this.handleChange}/>
                        </FloatingLabel>
                    </Col>

                    <Col sm="4">
                        <FloatingLabel label="Select Model's Make">
                        <Form.Select placeholder="0" onChange={this.handleSelectChange}>
                            {makesList}
                        </Form.Select>
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
                            <th>Model</th>
                            <th>Year</th>
                            <th>Make ID</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key="1">
                                <td>{this.state.createdModel.id}</td>
                                <td>{this.state.createdModel.model}</td>
                                <td>{this.state.createdModel.year}</td>
                                <td>{this.state.createdModel.carmakeid_id}</td>
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
    else {
        return (
            <Container>
                <h1 style={{textAlign:'center', color:'rgb(40, 150, 250)'}}>...</h1>
            </Container>
        );
    }
}
    
}

export default CreateFormML;