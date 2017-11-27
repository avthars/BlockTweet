//**************************************************************
// BlockTweetBackend.js
// Author: Avthar Sewrathan
// Purpose: Houses all functions to interact with Blockstack
//          user profile and storage
//**************************************************************
import * as blockstack from 'blockstack';
//Sign in functions
import {redirectToSignIn, isSignInPending,
handlePendingSignIn,loadUserData, isUserSignedIn,
signUserOut, makeAuthRequest,redirectToSignInWithAuthRequest,
getAuthResponseToken} from 'blockstack';
//Profile functions

//Storage functions
import {getFile, putFile, encryptECIES,
decryptECIES} from 'blockstack';

//var blockstack = require('blockstack')

//**************************************************************
//Tweet object
//**************************************************************
function Tweet(content, createDate, author){
    this.content = content;
    this.createDate = createDate;
    this.author = author;
}
//Function prototypes for Tweets
Tweet.prototype.getContent = function() {return this.content;}
Tweet.prototype.getAuthor = function() {return this.author;}

//**************************************************************
//User profile object
//**************************************************************
function User(){}


//**************************************************************
// When App Starts up, handle login automatically
//**************************************************************
function handleLoginOnStartUp() {
  //if user is signed in, show their profile info
  if (blockstack.isUserSignedIn()) {
    var user = blockstack.loadUserData().profile
    //blockstack.loadUserData(function(userData) {
    //  showProfile(userData.profile)
    //})
  }
  //signin pending, 
  else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn.then((userData) => {window.location = window.location.origin})
  }

}  

//**************************************************************
// Sign user in
//**************************************************************
  function BlockTweetSignIn() {
    //var authRequest = blockstack.makeAuthRequest(null, window.location.origin)
    //blockstack.redirectUserToSignIn(authRequest)
    blockstack.redirectToSignIn();
  }
//**************************************************************
// Sign user out
//**************************************************************
function BlockTweetSignOut(){
    blockstack.signUserOut(window.location.origin)
  }

//**************************************************************
// Show users profile
//**************************************************************
function showProfile(profile) {
    var person = new blockstack.Person(profile)
    //display this info somewhere in the page
    var name = person.name();
    var profilePicUrl = person.avatarUrl()
    //print to see if this worked
    console.log(name);
    console.log(profilePicUrl);
    //document.getElementById('heading-name').innerHTML = person.name()
    //document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
  }

//**************************************************************
// Export functions for use in other modules
//**************************************************************
export {
  BlockTweetSignIn, BlockTweetSignOut, handleLoginOnStartUp, showProfile
};




