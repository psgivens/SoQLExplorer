import * as React from 'react';
import { BrowserRouter as Router, Route, Switch   } from "react-router-dom"


import './css/soqle.css'

import './App.css'

import DatasourceManagement from './components/DatasourceManagement';
import Explorer from './components/Explorer'
import Home from './components/Home'
import MainMenu from './controls/MainMenu'

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <MainMenu />
        <Switch>
          <Route path="/Home" component={ Home } />
          {/* <Route path="/CounterDemo" component={ CounterDemo } />
          <Route path="/ListDemo" component={ ListDemo } />
          <Route path="/PomodoroDemo" component={ PomodoroDemo } />            
          <Route path="/ThirdDemo" component={ ThirdDemo } />*/}
          <Route path="/Explorer" component={ Explorer } />
          <Route path="/Datasources" component={ DatasourceManagement } />
          <Route path="/" component={ Home } />                    
        </Switch>
        </>
      </ Router>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( (el:any) => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target:any = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

export default App;
