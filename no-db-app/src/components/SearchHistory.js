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
        this.releasePoke = this.releasePoke.bind(this)
        this.pressedEnter = this.pressedEnter.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
        this.usernameChange = this.usernameChange.bind(this)
        this.getUser = this.getUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.logOut = this.logOut.bind(this)
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

            } else if (document.getElementById('radio-login').checked) {
                this.getUser()

            } else (alert('please select new user or login')); this.setState({ input: '' })
        }
    }
    getUser() {
        let { input } = this.state


        axios.get(`http://localhost:3001/api/users/${input}`).then(res => {
            if (res.data !== false) {
                this.setState({ user: res.data, input: '', userIsLoggedIn: true })
                this.props.userLoggedIn(true)
            } else {
                this.setState({ input: '' })
                alert('no such user exists')
            }
        })
    }
    addNewUser() {
        //upload username to axios
        let { input } = this.state
        const user = { name: input, pokemon: [] }
        axios.post('http://localhost:3001/api/users', { user }).then(res => {
            if (res.data !== false) {
                this.setState({ user: res.data, input: '', userIsLoggedIn: true })
                this.props.userLoggedIn(true)
                console.log(res.data)
            } else {
                this.setState({ input: '' })
                alert('user already exists')
            }
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
            if (this.state.user.pokemon.length < 6) {
                console.log(`user pokes num: ${this.state.user.pokemon.length}`)
                this.updateUser()
            } else alert(`Limit: 6 Pokemon per trainer`)
        }
    }
    logOut() {
        // set state user to default
        this.setState({ user: { name: '', pokemon: [], num: 3 }, userIsLoggedIn: false })
        // set state userIsLoggedIn to false
        // call props function to alert app.js that userLoggedIn is false
        this.props.userLoggedIn(false)
        console.log(`user logged in: ${this.state.userIsLoggedIn}`)
    }
    releasePoke(poke) {
        Function.prototype()
        //do a put call to node to remove 'poke' from user.pokemon[]
        ///api/users/:user/:poke
        // this is messy: consider updating the user object on this side, before sending to node server
        axios.put(`http://localhost:3001/api/users/${this.state.user.name}/${poke}`).then(res => {
            this.setState({ user: res.data })
        })
    }

    render() {

        return (
            <div id="SearchHistory-component">
                <div className="user-header">

                    <h1>{this.state.user.name ? `Welcome ${this.state.user.name}` : 'Please login'} </h1>
                    <button className="confirm-button" id="logout-button" onClick={this.logOut}>LOGOUT {+this.state.userIsLoggedIn}</button>
                </div>
                <div className="test-node-server-box">
                    <input className='radio' id="radio-new-user" type='radio' name='login' value='new user' />
                    <label for="radio-new-user">new user</label>
                    <input className='radio' id='radio-login' type='radio' name='login' value='login' />
                    <label for='radio-login'>login</label>

                    <input placeholder="enter username" disabled={this.state.userIsLoggedIn ? true : false}
                        onChange={this.usernameChange}
                        onKeyPress={this.pressedEnter}
                        value={this.state.input}
                    />
                    <div className="user-pokemon-container">

                        {/* map through this.state.user.pokemon   */}
                        {this.state.userIsLoggedIn ?
                            this.state.user.pokemon.map((e, i) => (
                                <div key={i} className="user-pokemon-item" ><img src={pokeball} alt='pb' height="20" width="20" onClick={() => this.props.askForPokemon(1, e)} /><p>{e}</p>
                                    <button className="confirm-button" onClick={() => this.releasePoke(e)}>release</button></div>
                            )) : Function.prototype()

                        }







                    </div>
                </div>
            </div>








        )
    }
}