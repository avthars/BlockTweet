//Login Screen Components
import React, {Component, Button } from 'react';

export class LoginButton extends Component {
    constructor(props){
        super(props)
        this.state = {clicked: false};

        //Bind click to this component
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        //indicate that button was clicked
        console.log('The login button was clicked');
    }

    render(){
        return (
            //Login Button
            <div>
                <h1>Login with Blockstack</h1>
                <Button onClick = {this.handleClick}>
                    Login with Blockstack
                 </Button>
            </div>
        );
    }
}

