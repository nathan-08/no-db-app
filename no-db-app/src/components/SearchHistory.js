import React, { Component } from 'react'
import axios from 'axios'

export default class SearchHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toServer: '',
            user: { name: '', favorites: [] },
            userIsLoggedIn: false,
            input: ''
        }
        this.pressedEnter = this.pressedEnter.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.usernameChange = this.usernameChange.bind(this)
    }
    doSomething() {
        alert('quo usque tandem?')
    }

    usernameChange(e) {
        //set user in state
        this.setState({
            input: e.target.value 
        })
        
    }
    pressedEnter(e) {
        const { user } = this.state;
        if (e.key === "Enter" && this.state.input !== 0) {
            //check if new user or login
            if(document.getElementById('radio-new-user').checked){
            //set user in state
            
            let { input } = this.state
                this.setState({ user: { name: input}, input: '', userIsLoggedIn: true })
                //here is where we send data back to app.js
                this.props.userLoggedIn(this.state.userIsLoggedIn)
                this.updateUser()
        
        } else alert('funtion not yet implemented')
        }
    }
    updateUser(){
        //upload username to axios
        const { user } = this.state;
        axios.post('http://localhost:3001/api/users', { user }).then(res => console.log(`response from server: ${res}`))
        
    }

    
    render() {

        return (
            <div id="SearchHistory-component">
                <h1>{ this.state.user.name ?  `Welcome ${this.state.user.name}`  : 'Please login' }</h1>
            
                <div className="test-node-server-box">
                    <input id="radio-new-user" type='radio' name='login' value='new user'/>
                    <label for="radio-new-user">new user</label>
                    <input id='radio-login' type='radio' name='login' value='login'/>
                    <label for='radio-login'>login</label>
                    
                    <input placeholder="enter username" disabled={ this.state.userIsLoggedIn ? true : false }
                        onChange={this.usernameChange}
                        onKeyPress={this.pressedEnter}
                        value={this.state.input}
                    /> {+this.props.addFavFlag} <button className="confirm-button" onClick={this.props.hitFavFlag}>hit flag</button>
                    <div className="user-pokemon-container">
                        
                        <div className="user-pokemon-item"><button className="confirm-button">remove</button></div>
                        <div className="user-pokemon-item"><button className="confirm-button">remove</button></div>
                        <div className="user-pokemon-item"><button className="confirm-button">remove</button></div>
                        <div className="user-pokemon-item"><button className="confirm-button">remove</button></div>
                        <div className="user-pokemon-item"><button className="confirm-button">remove</button></div>
                        

                        


                    </div>
                    </div>
                </div>
            




         


        )
    }
}