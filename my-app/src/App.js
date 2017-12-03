import React, { Component, Button } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from  'react-dom';
import {LoginButton} from './Login.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Welcome to BlockTweet!
        </p>
        <LoginButton/>
      </div>
    );
  }
}
export default App;



