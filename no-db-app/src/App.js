import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './reset.css';
import GetData from './components/GetData'
import axios from 'axios';
import SearchHistory from './components/SearchHistory'


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
      weight: null,
      shiny: 'shiny',
      moves: [],
      userLoggedIn: false,
      addFavFlag: false,
      // user's pokemon to be displayed in lower window
      pokemon01: {},
      normalSprite01: '',
      shinySprite01: '',
      type01: '',
      weight01: null,
      moves01: [],
      uNameID: []

    }
    this.hitFavFlag = this.hitFavFlag.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.makeShiny = this.makeShiny.bind(this)
    this.askForPokemon = this.askForPokemon.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
    this.userLoggedIn = this.userLoggedIn.bind(this)
    this.setUnameId = this.setUnameId.bind(this)

  }
  hitFavFlag() {
    this.state.addFavFlag ? this.setState({ addFavFlag: false }) : this.setState({ addFavFlag: true })
  }
  setUnameId(str, num) {
    this.setState({ uNameID: [str, num] })
  }
  handleInput(e) {
    this.setState({
      userInput: e.target.value
    })
  }
  userLoggedIn(val) {


    this.setState({ userLoggedIn: val })

  }
  // the parameter of askForPokemon indicates by whom it is being called. 
  // 0 = search box, 1 = user pokemon field
  // the second param will be the name of pokmeon to search  
  askForPokemon(bool, str) {
    if (bool) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${str}`).then(res => {
        this.setState({
          userInput: '',
          pokemon01: res.data,
          normalSprite01: res.data.sprites.front_default,
          type01: res.data.types[0].type.name,
          shinySprite01: res.data.sprites.front_shiny,
          moves01: res.data.moves,
          weight01: res.data.weight
        })
      })
    } else {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.userInput}`).then(res => {
        this.setState({
          userInput: '',
          storedInput: [...this.state.storedInput, this.state.userInput],
          pokemon: res.data,
          normalSprite: res.data.sprites.front_default,
          type: res.data.types[0].type.name,
          shinySprite: res.data.sprites.front_shiny,
          moves: res.data.moves,
          weight: res.data.weight
        }); console.log(res.data)
      })
    }
    {/*TODO IF already exists in stored INput, check with CONFIRM*/ }
  }
  handleKeypress(e) {
    if (e.key === 'Enter') {
      this.askForPokemon(0)
    }
  }
  makeShiny() { this.state.shiny === 'shiny' ? this.setState({ shiny: 'normal' }) : this.setState({ shiny: 'shiny' }) }

  ordinalNumber() {
    if (!this.state.userLoggedIn) return 'error, this should not have been called'
    switch (this.state.uNameID[1]) {
      case 1: return 'first'
      case 2: return 'second'
      case 3: return 'third'
      case 4: return 'fourth'
      case 5: return 'fifth'
      case 6: return 'sixth'
      case 7: return 'seventh'
      case 8: return 'eighth'
      case 9: return 'ninth'
      case 10: return 'tenth'
      case 11: return 'eleventh'
      case 12: return 'twelfth'
      case 13: return '13th'
      default: return this.state.uNameID[1] % 10 === 1 ? `${this.state.uNameID[1]}st`
        : this.state.uNameID[1] % 10 === 2 ? `${this.state.uNameID[1]}nd`
          : this.state.uNameID[1] % 10 === 3 ? `${this.state.uNameID[1]}rd`
            : `${this.state.uNameID[1]}th`
    }
  }


  render() {

    return (
      <div className="App" id="App-container">
        <div className="app-header">SUPERCOOL POKE-API PROJECT </div>
        <section className="app-body">


          {/*LEFT SIDE ================================================================================================  */}
          <div className="app-left-side">
            <div className="left-side-header">{this.state.userLoggedIn ? `you are the ${this.ordinalNumber()} user!` : 'log in to catch pokemon!'}
            </div>
            <div className="search-box">
              <h3>Press enter to search</h3>

              <input placeholder="enter a pokemon" value={this.state.userInput} onChange={this.handleInput} onKeyPress={this.handleKeypress} />
            </div>
            <SearchHistory storedInput={this.state.storedInput} userLoggedIn={this.userLoggedIn}
              pokemon={this.state.pokemon} addFavFlag={this.state.addFavFlag} hitFavFlag={this.hitFavFlag}
              pokemon={this.state.pokemon} askForPokemon={this.askForPokemon} setUnameId={this.setUnameId} />
            {/*SERVER TEST+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}

          </div>




          {/*RIGHT SIDE ================================================================================================  */}
          <div className="app-right-side">
            <h3>Pokedex</h3>

            <GetData className="GetData" userInput={this.state.userInput} userLoggedIn={this.state.userLoggedIn}
              hitFavFlag={this.hitFavFlag} makeShiny={this.makeShiny} shiny={this.state.shiny} askForPokemon={this.askForPokemon}
              // first set pokemon data
              pokemon={this.state.pokemon}
              normalSprite={this.state.normalSprite}
              shinySprite={this.state.shinySprite}
              type={this.state.type}
              moves={this.state.moves}
              weight={this.state.weight}
              // secondary set pokemon data
              pokemon01={this.state.pokemon01}
              normalSprite01={this.state.normalSprite01}
              shinySprite01={this.state.shinySprite01}
              type01={this.state.type01}
              moves01={this.state.moves01}
              weight01={this.state.weight01}
            />





          </div>
          {/*================================================================================================  */}
        </section>

      </div>
    );
  }
}

export default App;
