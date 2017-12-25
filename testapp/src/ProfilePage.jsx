//**************************************************************
//Profile Page which displays all of users Tweets
//**************************************************************
import React from 'react';

//**************************************************************
//Profile Page component
//**************************************************************
class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
      let passedData = this.props.userData;
      this.state = {userTweets: passedData};
    }
  
  //Function to add new tweet to list
    addTweet(newItem){
      //add to local list of tweets
      this.setState(prevState => ({
          //concat new item onto list of old items
        userTweets: prevState.userTweets.concat(newItem),
      }));

      //update tweets stored in user storage
      this.props.putData(this.state.userTweets);
    }

    //put data into storage before component unmounts
    componentWillUnmount(){
      this.props.putData(this.state.userTweets);
    }
  
    // add to render: <TweetList userTweets={this.state.userTweets} />
    render() {
      return (
      <div>
            <h1>{this.props.userName} BlockTweet Profile</h1>
            <InputBox 
            tweetList = {this.state.userTweets} 
            addTweet = {this.addTweet.bind(this)}
            userName = {this.props.userName}
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
        const currTweet = {id: new Date(), text: this.state.text};
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