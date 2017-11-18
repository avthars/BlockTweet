import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Tweet} from './Tweet.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BlockTweet</h1>
        </header>
        <p className="App-intro">
          Welcome to BlockTweet!
        </p>
        <LoginButton/>
        <Tweet/>
      </div>
    );
  }
}
export default App;

export class LoginButton extends Component{
  constructor(props){
    super(props);
    this.state = {clicked: false};
    //bind
    this.handleClick = this.handleClick.bind(this);
  }
 

  handleClick(){
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }
  render(){
    return(
      <div>
      <button
      onClick = {this.handleClick}
      >Login with BlockStack ID</button>
      <p>{this.state.clicked ? "ON":"OFF"}</p>
      </div>
    );
  }
}
