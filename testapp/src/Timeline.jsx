import React from 'react';
import './Timeline.css';

//**************************************************************
//Timeline component
//Displays all tweets from people that the logged in user
// follows
//props.following = list of users that logged in user followes
//props.userName = name of current user
//**************************************************************
export class Timeline extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //list of people user is following
            following: this.props.following,
            //list of tweets from following-ers
            tweetList: [],
        };
    }

    

    componentDidMount() {
        console.log("Timeline component did mount");
        //get tweets from each id in the list of following
        var followingList = this.state.following;
        console.log("Folowing list:");
        console.log(followingList);
        //temp list used to add tweets to before updating state all at once
        //var tempTweetList = [];
        followingList.forEach(userid => {
            console.log("in for each loop");
            console.log(userid);
            var options = {decrypt: false, user: userid, app: 'http://localhost:8080'};
            //Get their tweets from storage
            var STORAGE_FILE_PATH = 'tweets.json';
            blockstack.getFile(STORAGE_FILE_PATH, options).then(
                (tweetsText) => {
                    console.log("Getting data from timeline storage");
                    //parse tweets
                    var tweets = JSON.parse(tweetsText || '[]');
                    console.log("got the tweets");
                    console.log(tweets);
                    this.setState({tweetList: tweets}, () => {console.log(this.state);})
                  })
            });
    }

    /*
    //Update tweetList after getting list of followers
    componentWillReceiveProps(nextProps){
        this.setState({following: nextProps.following},() => {
            //print current state
            console.log("Timeline update props");
            console.log(this.state);
            //get tweets from each id in the list of following
            var followingList = this.state.following;
            console.log("Folowing list:");
            console.log(followingList);
            //temp list used to add tweets to before updating state all at once
            var tempTweetList = [];
            followingList.forEach(userid => {
                console.log("in for each loop");
                console.log(userid);
                var options = {decrypt: false, user: userid, app: 'http://localhost:8080'};
                //Get their tweets from storage
                var STORAGE_FILE_PATH = 'tweets.json';
                blockstack.getFile(STORAGE_FILE_PATH, options).then(
                  (tweetsText) => {
                    console.log("Getting data from timeline storage");
                    //parse tweets
                    var tweets = JSON.parse(tweetsText || '[]');
                    console.log("got the tweets");
                    console.log(tweets);
                    tweets.forEach(tweet => {
                        this.setState((prevState, props) => {
                            //add tweet to state
                            prevState.tweetList.concat(tweet);
                        }, () => {
                            console.log("Added tweet to list"); 
                            console.log(this.state.tweetList);});
                    });
                  })
            });
        });
    }
*/
    

    render(){
        return(
            <TimelineTweetList
            timelineTweets = {this.state.tweetList}
            userName = {this.props.userName}
            />
        );
    }

}


//**************************************************************
// Child component of Timeline
// Takes in a list of tweets and displays it
//**************************************************************
export class TimelineTweetList extends React.Component {
    constructor(props){
      super(props);
      this.state = {};
    }
  
    render() {
      return (
      <div>
      <h3>{this.props.userName}'s Timeline</h3>
        <ul reversed>
          {this.props.timelineTweets.reverse().map(tweet => (
            <li key={tweet.id}>{tweet.text}</li>
          ))}
        </ul>
      </div>
      );
    }
  }