import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {Tweet} from './Tweet.jsx';
import {NavBar} from './NavBar.jsx'
import {ProfilePage} from './ProfilePage.jsx';
import {SearchPage, SearchBar} from './SearchPage.jsx';
import blockTweetLogo from './BlockTweet_Logo.png';

import * as blockstack from 'blockstack';
//Sign in functions
import {redirectToSignIn, isSignInPending,
handlePendingSignIn,loadUserData, isUserSignedIn,
signUserOut, makeAuthRequest,redirectToSignInWithAuthRequest,
getAuthResponseToken} from 'blockstack';
import { Timeline } from './Timeline.jsx';
window.blockstack = require('blockstack')

/******************************************************************/
// Main App component
// Stores central app state, manages getting/ putting data into user
// storage
/******************************************************************/
class App extends Component {
  constructor(props){
    super(props);
    //initially set user details to null, will update upon login
    //followers = list of people following this user
    //following = list of people this user follows

    //userData = tweets
    //bsUserData = blockstack user data object
    this.state = {
      isSignedIn: false,
      user: null,
      bsUserData: null,
      userPosts: [],
      userName: 'Nameless',
      userId: 'name_less',
      userBio: '',
      followers: [],
      following:['avthars.id'],
    };
  
  //bind for callback
  this.putDataInStorage  = this.putDataInStorage.bind(this);
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

  //puts data into user's BS Storage
  putDataInStorage(data, type) {
    console.log('In putData()');
    console.log("Data to be put in storage");
    console.log(data);
    //determine what kind of data to store and in which file
    var STORAGE_FILE_PATH = 'tweets.json';
    //type 1 = tweets
    //type 2 = followers
    //type 3 = following
    if (type == 1){
      this.setState({userPosts: data}, () => { 
        console.log('updating state in putDataInStorage');
        console.log(this.state.userPosts);});
    }
    else if(type == 2){
      STORAGE_FILE_PATH = 'followers.json';
      this.setState({followers: data});
    }
    else if (type == 3) {
      STORAGE_FILE_PATH = 'following.json';
      this.setState({following: data});
    }
    //update: set options for MR file storage
    var options = {encrypt: false, public: true};
    let success = blockstack.putFile(STORAGE_FILE_PATH, JSON.stringify(data), options);
    if (!success){
      console.log("ERROR: Could not put file in storage");
    }
    else {
      console.log("SUCCESS: PUT FILE IN USER STORAGE");
  }
  }

  //load user profile
  loadPerson() {
    let profile = blockstack.loadUserData().profile

    return new blockstack.Person(profile)
  }

  loadUserData() {
    let userData = blockstack.loadUserData();
    return userData;
  }


  //check for login on start, then set state to reflect info from profile
  componentWillMount(){
    let userIsSignedIn = this.checkSignedInStatus();
    //if user is signed in
    if(userIsSignedIn){
      let person = this.loadPerson();
      console.log(person);
      let loadedData = this.loadUserData();
      console.log("User data object");
      console.log(loadedData);
      console.log(loadedData.username);

      this.setState({
          isSignedIn: true,
          user: person,
          bsUserData: loadedData,
          userName: person.name(),
          userId: loadedData.username,
          userBio: person.description(),
        });
    }
  }

  //fetch data from user profile and set it as app state
  componentDidMount(){  
    if(this.state.isSignedIn){
      console.log("In didMount");
      //options object for getFile
      //assume userID has been set at this point, hardcode to avthars.id otherwise
      var options = {decrypt: false, user: this.state.userId, app: 'http://localhost:8080'};
      var STORAGE_FILE_PATH = 'tweets.json';
      blockstack.getFile(STORAGE_FILE_PATH, options).then(
        (tweetsText) => {
          console.log("Getting data from storage");
          //parse tweets
          var tweets = JSON.parse(tweetsText || '[]');
          console.log("got the tweets");
          console.log(tweets);
          //set state after we've got the data and print to console
          this.setState({userPosts: tweets}, () => {
            console.log("State After DidMount"); 
            console.log(this.state);});
        })
    }
  }


  render() {
    var isLoggedIn = this.checkSignedInStatus();

    return (
      <Router>
      <div className="App">
        <Header
        loggedIn = {isLoggedIn}
        />
        
        <Route exact path = "/login"
        render = {() => <LoginPage/>
        }/>

        <Route exact path = "/timeline"
        render = {() => <Timeline 
          userName = {this.state.userName}
          following = {this.state.following}
        />
        
        }/>

        <Route exact path = "/home"
        render = {() => <ProfilePage user = {this.state.user}
          userPosts = {this.state.userPosts} 
          userName = {this.state.userName}
          userBio = {this.state.userBio}
          userId = {this.state.userId}
          userPic = {this.state.user.avatarUrl()}
          folowers = {this.state.followers}
          following = {this.state.following}
          putData = {this.putDataInStorage}
          loggedIn = {isLoggedIn}/>
        }/>

        <Route exact path = "/search"
        render = {() => <SearchPage/>
        }/>
        
      </div>
      </Router>
    );
  }
}
export default App;


/******************************************************************/
//Header component
//Header to be displayed on every page
//props: loggedIn - is user logged in?
/******************************************************************/
export class Header extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    //show the nav bar only if user is logged in
    let showNav = this.props.loggedIn ?  <NavBar/>: null;
    return (
    <div>
    <header className="App-header">
    <h1 className="App-title">BlockTweet</h1>
    </header>
    {showNav}
    <p className = {"App-intro"}> Welcome to BlockTweet!</p>
    <p>Login / Logout with Blockstack below:</p>
    <LoginPage/>
    </div>);
  }
}

/******************************************************************/
//Login Page
/******************************************************************/
export class LoginPage extends Component{
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
    //MR sign in
    let permissions = ['app_index'];
    blockstack.redirectToSignIn(`${window.location.origin}/`, `${window.location.origin}/manifest.json`, permissions);
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
      className ='login-button'
      onClick = {this.handleSignIn}
      >Login with BlockStack ID</button>
      <button className = 'logout-button' onClick = {this.handleSignOut}> Logout </button> 
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
