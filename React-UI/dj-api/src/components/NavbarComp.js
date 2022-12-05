import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavbarComp extends Component {
    render() {
        return (
        <Navbar className="nav" variant="dark" expand="lg" style={{position: 'fixed', width: '100%'}}>
            <Container>
                <Navbar.Brand><img className="App-logo invert-img" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_255000.png&f=1&nofb=1&ipt=b2ea46f25bb566f5179fc3a373dc76bd4cbc2048657e34640f7b0a02ca7c5342&ipo=images" width={50} height={50} alt="-car-"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" defaultActiveKey="s">
                    <Nav.Link eventKey="s" onClick={() => this.props.handleClick('search')}><b>-search-</b></Nav.Link>
                    <Nav.Link eventKey="u" onClick={() => this.props.handleClick('update')}><b>-update-</b></Nav.Link>
                    <Nav.Link eventKey="c" onClick={() => this.props.handleClick('create')}><b>-create-</b></Nav.Link>
                    <Nav.Link eventKey="d" onClick={() => this.props.handleClick('delete')}><b>-delete-</b></Nav.Link>
                </Nav>
                <Nav defaultActiveKey="cars">
                    <Nav.Link eventKey="cars" onClick={() => this.props.handleCatClick('cars')}><b>|cars|</b></Nav.Link>
                    <Nav.Link eventKey="models" onClick={() => this.props.handleCatClick('models')}><b>|car models|</b></Nav.Link>
                    <Nav.Link eventKey="makes" onClick={() => this.props.handleCatClick('makes')}><b>|car makes|</b></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
        );
    }
}

export default NavbarComp;