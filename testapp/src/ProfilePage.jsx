//**************************************************************
//Profile Page which displays all of users Tweets
//**************************************************************
import React from 'react';
import {NavBar} from './NavBar.jsx';
import './ProfilePage.css';

//**************************************************************
//Profile Page component
//**************************************************************
class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userTweets: this.props.userPosts,
        followers: this.props.followers,
        following: this.props.following,
      };
    }
  
  //Function to add new tweet to list
    addTweet(newItem){
      //add to local list of tweets
      this.setState(prevState => ({
          //concat new item onto list of old items
        userTweets: prevState.userTweets.concat(newItem),
      }));

      //update tweets stored in user storage, with type code 1
      this.props.putData(this.state.userTweets, 1);
    }

    //function to add new person this user follows - i.e following
    addFollowing(following_id){
      //add to local list of following
      this.setState(prevState => ({
        //concat new item onto list of old items
      following: prevState.following.concat(following_id),
    }));

    //update following in user storage, with type code 3
    this.props.putData(this.state.following, 3);
    }

    //update props of this component when overall app state changes
    //and new props are passed down
    componentWillReceiveProps(nextProps) {
      this.setState({ 
        userTweets: nextProps.userPosts,
        followers: nextProps.followers,
        following: nextProps.following,
       });  
    }

    //put data into storage before component unmounts
    componentWillUnmount(){
      this.props.putData(this.state.userTweets, 1);
      this.props.putData(this.state.followers, 2);
      this.props.putData(this.state.following, 3);
    }
  
    // add to render: <TweetList userTweets={this.state.userTweets} />
    render() {
      return (
      <div>
            <h1>{this.props.userName}'s BlockTweet Profile</h1>
            <h2>{this.props.userId}</h2>
            <h5>{this.props.userBio}</h5>
            <InputBox 
            tweetList = {this.state.userTweets} 
            addTweet = {this.addTweet.bind(this)}
            userName = {this.props.userName}
            userId = {this.props.userId}
            />
            <hr/>
            <TweetList userTweets={this.state.userTweets} userName = {this.props.userName} />
        </div>
      );
    }
  }
  
//**************************************************************
//InputBox component: User enters a new tweet and it's added
// to list of tweets
//**************************************************************
class InputBox extends React.Component{
    constructor(props){
        super(props);
        //Fields of State of component
        this.state = {
            text: ''
        };
        //bind methods to this component
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //gets value entered into target and set it to
        // 'text' state field
        //event.target = input field
        //value = current value of it
        this.setState({text: event.target.value});
      }

      //When user submits tweet
      onAddTweet(event){
        event.preventDefault();
        
        if (!this.state.text.length) {
          return;
        }
        
        //currTweet: {id: new Date(), text: this.state.text}
        const idnum = this.props.tweetList.length;
        // id, text, creator, date
        const currTweet = {id: idnum, text: this.state.text, by: this.props.userId, date: new Date()};
       
        //call parent function
        this.props.addTweet(currTweet);
        //set text in box back to empty
        this.setState({text: ''});
      }

      //<button onClick = {this.props.addTweet}>Input</button>
    render(){
        return(
            <div>
            <h3>What's on your mind, {this.props.userName}?</h3>
            <form className = 'input-box'
             onSubmit={this.handleSubmit}>
              <textarea
                onChange={(event) => this.handleChange (event)}
                value={this.state.text}
              />
              <button 
              onClick = {(event) => this.onAddTweet(event)}>
              Tweet
              </button>
            </form>
            
          </div>
        );

    }
}
 
//**************************************************************
// Child component of Profile page
//List of Tweets that user has previously entered
//passed in a list userTweets as props
//**************************************************************
// what happends when we take out <ul>?
//Step two: map this list to a list of Tweet objects
class TweetList extends React.Component {
  render() {
    return (
    <div>
    <h3>{this.props.userName}'s Tweets</h3>
      <ul reversed>
        {this.props.userTweets.reverse().map(tweet => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
    );
  }
}
//export all components on this page for reuse
export {ProfilePage, InputBox, TweetList};