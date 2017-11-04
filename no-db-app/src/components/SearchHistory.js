import React, { Component } from 'react'
import axios from 'axios'

export default class SearchHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toServer: '',
            user: { name: '', favorites: [] }
        }
        this.serverData = this.serverData.bind(this)
        this.serverKeyPress = this.serverKeyPress.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.usernameChange = this.usernameChange.bind(this)
    }
    doSomething() {
        alert('quo usque tandem?')
    }
    serverData(e) {
        this.setState({ toServer: e.target.value })
    }
    usernameChange(e) {
        //set user in state
        this.setState({
            user: { name: e.target.value }
        })
        console.log(`user.name: ${this.state.user.name}`)
    }
    updateUser(e) {
        const { user } = this.state;
        if (e.key === "Enter" && user.name.length !== 0){
            
            //upload username to axios
            axios.post('http://localhost:3001/test', { user }).then(res => console.log(`response from server: ${res}`))
            
        }
    }
    serverKeyPress(e) {
        const { toServer } = this.state;
        if (e.key === "Enter" && toServer.length !== 0) {
            axios.post(`http://localhost:3001/test`, { toServer }).then(res => console.log(`response from server: ${res}`))
        }
    }
    render() {

        return (
            <div id="SearchHistory-component">
                <h1>Welcome: {this.state.user.name}</h1>
                
                <div className="test-node-server-box">
                    <input placeholder="enter username" 
                        onChange={this.usernameChange}
                        onKeyPress={this.updateUser}
                         />
                    <input placeholder="send sth to server"
                        onChange={this.serverData}
                        onKeyPress={this.serverKeyPress}
                        value={this.state.toServer} />

                </div>




            </div>


        )
    }
}