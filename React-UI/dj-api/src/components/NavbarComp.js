import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavbarComp extends Component {
    render() {
        return (
        <Navbar bg="light" variant="light" expand="lg" style={{position: 'fixed', width: '100%'}}>
            <Container>
                <Navbar.Brand><img className="App-logo" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_255000.png&f=1&nofb=1&ipt=b2ea46f25bb566f5179fc3a373dc76bd4cbc2048657e34640f7b0a02ca7c5342&ipo=images" width={50} height={50} alt="-car-"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={() => this.props.handleClick('search')}>-search-</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleClick('update')}>-update-</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleClick('create')}>-create-</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleClick('delete')}>-delete-</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => this.props.handleCatClick('cars')}>|cars|</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleCatClick('models')}>|car models|</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleCatClick('makes')}>|car makes|</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
        );
    }
}

export default NavbarComp;