//**************************************************************
// Other Profile Page which displays info and tweets of user
// that is not logged in user
//**************************************************************
import React from 'react';
import {NavBar} from './NavBar.jsx';
import './ProfilePage.css';

//**************************************************************
//Profile Page component
//**************************************************************
export class OtherProfilePage extends React.Component {
    constructor(props) {
      super(props);
      //props = blockstack profile and userData
      this.state = {
      };
    }

    _onFollowButtonClick(){
        //add otherUser to list of currUser's following
        console.log('Followed this user');

        //add currUser to otherUser's list of followers
    }

    //update props of this component when overall app state changes
    //and new props are passed down
    componentWillReceiveProps(nextProps) {
      this.setState({
       });  
    }

    //put data into storage before component unmounts
    componentWillUnmount(){
    }
  
    // add to render: <TweetList userTweets={this.state.userTweets} />
    render() {
      return (
      <div>
            <h1>{this.props.userName}'s BlockTweet Profile</h1>
            <h2>{this.props.userId}</h2>
            <h5>{this.props.userBio}</h5>
            <button
            onClick = {(event) => this.onFollowButtonClick(event)}
            >Follow</button>
            <hr/>
            <TweetList userTweets={this.state.userTweets} userName = {this.props.userName} />
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
