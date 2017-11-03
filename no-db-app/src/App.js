import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './reset.css';
import GetData from './components/GetData'
import axios from 'axios';


class App extends Component {
  constructor() {
    super()
    this.state = {
      query: 'a query',
      userInput: '',
      storedInput: [],
      pokemon: {},
      normalSprite: '',
      shinySprite: '',
      type: '',
      shiny: 'shiny'
    }
    this.handleInput = this.handleInput.bind(this)
    this.makeShiny = this.makeShiny.bind(this)
    this.askForPokemon = this.askForPokemon.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)

  }
  handleInput(e) {
    this.setState({
      userInput: e.target.value
    })
  }

  askForPokemon() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.userInput}`).then(res => {
      this.setState({
        userInput: '',
        storedInput: [...this.state.storedInput, this.state.userInput],
        pokemon: res.data,
        normalSprite: res.data.sprites.front_default,
        type: res.data.types[0].type.name,
        shinySprite: res.data.sprites.front_shiny
      })

      console.log(this.state.pokemon)
    })
  }
  handleKeypress(e) {
    if (e.key === 'Enter') {
      this.askForPokemon()
    }
  }
  makeShiny() { this.state.shiny === 'shiny' ? this.setState({ shiny: 'normal' }) : this.setState({ shiny: 'shiny' }) }
  render() {
    return (
      <div className="App" id="App-container">
        <h1 className="app-header">SUPERCOOL POKE-API PROJECT</h1>
        <section className="app-body">


          {/*LEFT SIDE ================================================================================================  */}
          <div className="app-left-side">
            <h3>left side</h3>
            <span>Search: </span>
            <input value={this.state.userInput} onChange={this.handleInput} onKeyPress={this.handleKeypress} />
            <SearchHistory storedInput={this.state.storedInput} />




          </div>
          {/*RIGHT SIDE ================================================================================================  */}
          <div className="app-right-side">
            <h3>right side</h3>
            <span>Results:</span><GetData userInput={this.state.userInput}
              pokemon={this.state.pokemon} normalSprite={this.state.normalSprite}
              shinySprite={this.state.shinySprite} type={this.state.type} makeShiny={this.makeShiny}
              shiny={this.state.shiny} askForPokemon={this.askForPokemon} />




          </div>
          {/*================================================================================================  */}
        </section>

      </div>
    );
  }
}

export default App;
