//**************************************************************
// Search Page: Search for other BlockTweet users
//**************************************************************
import React, { Component } from 'react';
import {NavBar} from './NavBar.jsx';
import './SearchPage.css';
import * as blockstack from 'blockstack';
//Sign in functions
import {redirectToSignIn, isSignInPending,
handlePendingSignIn,loadUserData, isUserSignedIn,
signUserOut, makeAuthRequest,redirectToSignInWithAuthRequest,
getAuthResponseToken} from 'blockstack';
window.blockstack = require('blockstack')

//**************************************************************
// Search Page Main Component
//**************************************************************
export class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: '',
            searchResults: [],
        };
        this._searchForUser = this._searchForUser.bind(this);
    }

    //search function containing results of query to blockstack core node/ app index file
    _blockstackSearch(query){
        console.log('bssearch');
        return null;
    }

    //search for 'user.id' 
    //set searchResults to list of profiles that match, otherwise null
    _searchForUser(query){
        this.setState({searchQuery: query});
        //console.log('parent query is ' + this.state.searchQuery);

        //search for ids containing query
       let results = this._blockstackSearch(query);
        
        //set searchResults in state
        this.setState({searchResults: results,});
    }

    render(){
        return(
            <div>
                <SearchBar
                searchFunc = {this._searchForUser}
                />
                <SearchResults
                searchQuery = {this.state.searchQuery}
                searchResults = {this.state.searchResults}
                />
            </div>
        );
    }
}

//**************************************************************
// Search Bar componenet: User enters user name to search
//**************************************************************
export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: ''
        };
        //bind methods to this component
        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        //gets value entered into target and set it to
        // 'text' state field
        //event.target = input field
        //value = current value of it
        this.setState({text: event.target.value});
      }

      //When user submits tweet
      onSubmitQuery(event){
        event.preventDefault();
        
        //don't do anything if empty
        if (!this.state.text.length) {
          return;
        }
        
        let query = this.state.text;
        //call parent search function on button press
        this.props.searchFunc(query);
        console.log('query is ' + query);
        //set text in box back to empty
        this.setState({text: ''});
      }

      //<button onClick = {this.props.addTweet}>Input</button>
    render(){
        return(
            <div>
            <h2>Search for a BlockTweet user</h2>
            <form>
              <input className = "search-box"
                onChange={(event) => this.handleChange(event)}
                value={this.state.text}
                />
              <button className = "search-button"
              onClick = {(event) => this.onSubmitQuery(event)}>
              Search
              </button>
            </form>
          </div>
        );

    }
}

//**************************************************************
// Search Results
//**************************************************************
export class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rawResults: this.props.searchResults,
            query: this.props.searchQuery,
        };
    }

    //update state when receiving new props
    componentWillReceiveProps(nextProps) {
        this.setState({ 
          rawResults: nextProps.searchResults,
          query: nextProps.searchQuery,
         });
      }

    render(){
        //conditionally render error msg and search results
        let query = <h3>You searched for: {this.props.searchQuery}</h3>;
        let searchResults = null;
        let errorMsg = null;
        if(this.state.rawResults == null){
            errorMsg = <h3>No Results Found</h3>;
        }
        else {
            //ideal: make search results a list of hyperlinked blockstack ids
            //clicking on them leads us to the profile of that id
            searchResults = <h3>Results are here! ...</h3>;
        }
        return(
            <div className = 'search-results-div'>
                {query}
                {errorMsg}
                {searchResults}
            </div>
        );
    }
}