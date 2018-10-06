import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch   } from "react-router-dom"

import logo from './logo.svg';

import Home from './components/Home'

import MainMenu from './controls/MainMenu'

import Explorer from './components/Explorer'

import DatasourceManagement from './components/DatasourceManagement';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <>
        <img src={logo} className="App-logo" alt="logo" />
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

export default App;
