//Tweet Component for BlockTweet
import React, { Component } from 'react';
import './Tweet.css';
export class Tweet extends Component{
    constructor(props){
        super(props)
        this.state = {
            createDate: new Date(),
            author: 'Avthar'
        }
    }
    render(){
        return(
            <div className = "Tweet">
                <div>
                    <p>Author: {this.state.author}</p>
                    <p>Create date: {this.state.createDate.toLocaleTimeString()}</p>
                </div>
            </div>
        );
    }
}