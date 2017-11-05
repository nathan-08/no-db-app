import React, { Component } from 'react'
import axios from 'axios'
import pokeball from './../img/pokeball.png'

export default class SearchHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toServer: '',
            user: { name: '', pokemon: [], num: 3 },
            userIsLoggedIn: false,
            input: ''
        }
        this.pressedEnter = this.pressedEnter.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
        this.usernameChange = this.usernameChange.bind(this)
        this.getUser = this.getUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
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
            if (document.getElementById('radio-new-user').checked) {

                this.addNewUser()
                this.props.userLoggedIn(this.state.userIsLoggedIn)
            } else {
                this.getUser()
                this.props.userLoggedIn(this.state.userIsLoggedIn)
            }
        }
    }
    getUser() {
        let { input } = this.state

        axios.get(`http://localhost:3001/api/users/${input}`).then(res => {
            this.setState({ user: res.data, input: '', userIsLoggedIn: true })
        })
    }
    addNewUser() {
        //upload username to axios
        let { input } = this.state


        const user = { name: input, pokemon: [] }
        axios.post('http://localhost:3001/api/users', { user }).then(res => {
            this.setState({ user: res.data, input: '', userIsLoggedIn: true })
            console.log(res.data)
        })
    }
    updateUser() {
        let { name } = this.props.pokemon

        axios.put(`http://localhost:3001/api/users/${this.state.user.name}`, { name }).then(res => {
            this.setState({ user: res.data })


        })
    }
    componentDidUpdate() {
        //check this.props.addFavFlag
        if (this.props.addFavFlag) {
            //put to server user with user.favorites[this.props.pokemon.name]
            this.props.hitFavFlag()
            if (this.state.user.pokemon.length < 7) {
                console.log(`user pokes num: ${this.state.user.pokemon.length}`)
                this.updateUser()
            } else alert(`Limit: 6 Pokemon per trainer`)
        }
    }
    render() {

        return (
            <div id="SearchHistory-component">
                <div className="user-header">
                <h1>{this.state.user.name ? `Welcome ${this.state.user.name}` : 'Please login'}   {this.state.user.id}</h1>
                <button className="confirm-button" id="logout-button">Logout</button>
                </div>
                <div className="test-node-server-box">
                    <input id="radio-new-user" type='radio' name='login' value='new user' checked />
                    <label for="radio-new-user">new user</label>
                    <input id='radio-login' type='radio' name='login' value='login' />
                    <label for='radio-login'>login</label>

                    <input placeholder="enter username" disabled={this.state.userIsLoggedIn ? true : false}
                        onChange={this.usernameChange}
                        onKeyPress={this.pressedEnter}
                        value={this.state.input}
                    /> {+this.props.addFavFlag} <button className="confirm-button" onClick={this.props.hitFavFlag}>hit flag</button>
                    <div className="user-pokemon-container">

                        {/* map through this.state.user.pokemon   */}
                        {
                            this.state.user.pokemon.map((e, i) => (
                                <div key={i} className="user-pokemon-item"><img src={pokeball} alt='pb' height="20" width="20" /><p>{e}</p><button className="confirm-button">remove</button></div>
                            ))
                        }







                    </div>
                </div>
            </div>








        )
    }
}