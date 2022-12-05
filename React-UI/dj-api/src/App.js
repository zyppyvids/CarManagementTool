import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import SearchForm from "./components/cars/SearchForm";
import UpdateForm from "./components/cars/UpdateForm";
import CreateForm from './components/cars/CreateForm';
import DeleteForm from './components/cars/DeleteForm';
import SearchFormML from "./components/models/SearchForm";
import UpdateFormML from "./components/models/UpdateForm";
import CreateFormML from './components/models/CreateForm';
import DeleteFormML from './components/models/DeleteForm';
import SearchFormMK from "./components/makes/SearchForm";
import UpdateFormMK from "./components/makes/UpdateForm";
import CreateFormMK from './components/makes/CreateForm';
import DeleteFormMK from './components/makes/DeleteForm';
import NavbarComp from './components/NavbarComp';

class App extends Component {
  constructor(props){
    super(props)
    // Set web title
    document.title = "Simple Car API"

    // Set initial state
    this.state = 
    {
      view: 'cars.search',
      cat: 'cars'
    }
      
    // Binding this keyword
    this.handleClick = this.handleClick.bind(this)
    this.handleCatClick = this.handleCatClick.bind(this)
  }

  determineView(){
    if(this.state.view.includes('search')){
      return this.loadSearchView()
    } else if(this.state.view.includes('update')){
      return this.loadUpdateView()
    } else if(this.state.view.includes('create')){
      return this.loadCreateView()
    } else if(this.state.view.includes('delete')){
      return this.loadDeleteView()
    }
  }

  loadSearchView(){
    document.documentElement.style.setProperty('--sel-color','turquoise');
    return (
      <div className='vertical-horizontal-center'>
        <div className='boarded form content' style={{overflow: 'auto'}}>
          {this.state.cat === 'cars' ? <SearchForm /> : (this.state.cat === 'models' ? <SearchFormML /> : <SearchFormMK />)}
        </div>
      </div>
    ); 
  }

  loadUpdateView(){
    document.documentElement.style.setProperty('--sel-color','plum');
    return (
      <div className='vertical-horizontal-center'>
        <div className='boarded form content'>
          {this.state.cat === 'cars' ? <UpdateForm /> : (this.state.cat === 'models' ? <UpdateFormML /> : <UpdateFormMK />)}
        </div>
      </div>
    ); 
  }

  loadCreateView(){
    document.documentElement.style.setProperty('--sel-color','rgb(40, 150, 250)');
    return (
      <div className='vertical-horizontal-center'>
        <div className='boarded form content'>
          {this.state.cat === 'cars' ? <CreateForm /> : (this.state.cat === 'models' ? <CreateFormML /> : <CreateFormMK />)}
        </div>
      </div>
    ); 
  }

  loadDeleteView(){
    document.documentElement.style.setProperty('--sel-color','rgb(243, 80, 80)');
    return (
      <div className='vertical-horizontal-center'>
        <div className='boarded form content'>
          {this.state.cat === 'cars' ? <DeleteForm /> : (this.state.cat === 'models' ? <DeleteFormML /> : <DeleteFormMK />)}
        </div>
      </div>
    ); 
  }
  
  handleClick(viewName){
    this.setState({view: this.state.cat + "." + viewName})
  }

  handleCatClick(viewName){
    this.setState({cat: viewName})
  }

  render() {
    return [
    <NavbarComp handleClick={this.handleClick} handleCatClick={this.handleCatClick}/>,
    this.determineView()
    ];
  }
}

export default App;
