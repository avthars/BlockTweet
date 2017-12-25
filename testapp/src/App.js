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
    //let isSignedIn = this.checkSignedInStatus();
    this.state = {
      isSignedIn: false,
      user: null,
      userData: [], 
      userName: 'Nameless',
    };
  }

  //checks if user is signed in for app state
  checkSignedInStatus() {
    if (blockstack.isUserSignedIn()) {
      // showProfile(profile)
      return true;
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin
      })
      return false;
    }
  }

   //check for login on start
   componentWillMount(){
    let userIsSignedIn = this.checkSignedInStatus();

    //if user is signed in
    if(userIsSignedIn){
      //update state to reflect user info
      this.setState({
        isSignedIn: true,
        user: this.loadPerson(),
        userData: this.getDataFromStorage(),
        userName: this.loadPerson().name(),
      });
    }
  }

  //gets user data from BS Storage
  getDataFromStorage(){
    return [];
  }


  //puts data into user's BS Storage
  putDataInStorage(){}

  //load user profile
  loadPerson() {
    let profile = blockstack.loadUserData().profile

    return new blockstack.Person(profile)
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
        <ProfilePage user = {this.state.user}
         userData = {this.state.userData} 
         userName = {this.state.userName}/>
         <UserTestComponent
         user = {this.state.user}
         />

      </div>
    );
  }
}
export default App;

//Login Button component
export class LoginButton extends Component{
  constructor(props){
    super(props);
    this.state = {clicked: false};
    //bind
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  //onClick: Sign user in in Blockstack browser
  handleSignIn(event){
    event.preventDefault();
    blockstack.redirectToSignIn();
  }

  //onClick: Sign user out
  handleSignOut(event){
    event.preventDefault();
    blockstack.signUserOut(window.location.href);
  }

  render(){
    return(
      <div>
      <button
      onClick = {this.handleSignIn}
      >Login with BlockStack ID</button>
      <button onClick = {this.handleSignOut}> Logout </button> 
      </div>
    );
  }
}

//Testing user data retrieval from Blockstack Profile
export class UserTestComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.user && this.props.user.name() || 'Nameless',
      avatarUrl: this.props.user && this.props.user.avatarUrl() || undefined
    };
  }

  render(){
    return(
      <div className="UserInfo">
      <img className="avatar" src={this.state.avatarUrl} />
      <h1>{this.state.name}</h1>
    </div>
    );
  }

}
