//**************************************************************
//Nav Bar to be displayed at the top of each logged in page
//**************************************************************
import React, { Component } from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

//**************************************************************
// Main Nav Bar component
//**************************************************************
export class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div>
                <nav>
                <a href = "#">Home</a>
                <Link to = "/myprofile">My Profile</Link>
                <Link to = "/search">Search</Link>
                <Link to = "/login">Login</Link>
                </nav>
            </div>
        );
    }
}