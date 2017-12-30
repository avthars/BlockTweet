//**************************************************************
//Nav Bar to be displayed at the top of each logged in page
//**************************************************************
import React, { Component } from 'react';
import './NavBar.css';

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
                <a href = '#'>Home</a>
                <a href = '#'>My Profile</a>
                <a href = '#'>Search</a>
                <a href = '#'>Logout</a>
                </nav>
            </div>
        );
    }
}