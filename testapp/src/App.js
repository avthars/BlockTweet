import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Tweet} from './Tweet.jsx';
import {
  BlockTweetSignIn, BlockTweetSignOut, handleLoginOnStartUp
} from './BlockTweetBackend.js';
import {ProfilePage} from './ProfilePage.jsx';
import * as blockstack from 'blockstack';
//Sign in functions
import {redirectToSignIn, isSignInPending,
handlePendingSignIn,loadUserData, isUserSignedIn,
signUserOut, makeAuthRequest,redirectToSignInWithAuthRequest,
getAuthResponseToken} from 'blockstack';
window.blockstack = require('blockstack')

class App extends Component {
  constructor(props){
    super(props);
    //initially set user details to null, will update upon login
    this.state = {userData: null, userName: 'Wayne Rooney', user: null};
  }

  //check for login on start
  componentWillMount(){
    //this.setState(prevState => ({
    //  clicked: !prevState.clicked
    //}));
  }
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
        <hr/>
        <ProfilePage user = {this.state.user} userData = {this.state.userData} userName = {this.state.userName}/>
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
  //onClick: Sign user in in Blockstack browser
  handleClick(){
    blockstack.redirectToSignIn();
    //BlockTweetSignIn()
  }
  render(){
    return(
      <div>
      <button
      onClick = {this.handleClick}
      >Login with BlockStack ID</button>
      </div>
    );
  }
}
