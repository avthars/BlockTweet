import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Tweet} from './Tweet.jsx';
import {NavBar} from './NavBar.jsx'
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
      following:[],
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

  //puts data into user's BS Storage
  putDataInStorage(data, type) {
    //determine what kind of data to store and in which file
    var STORAGE_FILE = this.state.userId + '_tweets.json';
    STORAGE_FILE = 'tweets.json'; // temp set
    //type 1 = tweets
    //type 2 = followers
    //type 3 = following
    if (tyoe == 1){
      this.setState({userData: data});
    }
    else if(type == 2){
      STORAGE_FILE = this.state.userId + '_followers.json';
      this.setState({followers: data});
    }
    else if (type == 3) {
      STORAGE_FILE = this.state.userId + '_following.json';
      this.setState({following: data});
    }

    let encrypt = true;
    let success = blockstack.putFile(STORAGE_FILE, JSON.stringify(data), encrypt);
    if (!success){
      console.log("ERROR: Could not put file in storage");
    }
    else {console.log("SUCCESS: PUT FILE IN USER STORAGE");}
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
      //this.getDataFromStorage();
      let decrypt = true;
      var STORAGE_FILE = 'tweets.json';
      blockstack.getFile(STORAGE_FILE, decrypt).then(
        (tweetsText) => {
          console.log("In getDataFromStorage");
          //parse tweets
          var tweets = JSON.parse(tweetsText || '[]');
          console.log("got the tweets");
          console.log(tweets);
          //set state after we've got the data
          this.setState({userPosts: tweets});
          //this.setState()
        })
    }
    //force a state update
    //this.setState(this.state);
    console.log("Exited did mount");
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BlockTweet</h1>
        </header>
        <NavBar/>
        <p className="App-intro">
          Welcome to BlockTweet!
        </p>
        <LoginButton/>
        <hr/>
        <ProfilePage user = {this.state.user}
         userPosts = {this.state.userPosts} 
         userName = {this.state.userName}
         userBio = {this.state.userBio}
         userId = {this.state.userId}
         folowers = {this.state.followers}
         following = {this.state.following}
         putData = {this.putDataInStorage}/>
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
