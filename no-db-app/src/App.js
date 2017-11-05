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
      shiny: 'shiny',
      moves: [],
      userLoggedIn: false,
      addFavFlag: false,
      // user's pokemon to be displayed in lower window
      pokemon01: {},
      normalSprite01: '',
      shinySprite01: '',
      type01: '',
      moves01: [],

    }
    this.hitFavFlag = this.hitFavFlag.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.makeShiny = this.makeShiny.bind(this)
    this.askForPokemon = this.askForPokemon.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
    this.userLoggedIn = this.userLoggedIn.bind(this)
    

  }
  hitFavFlag(){
    this.state.addFavFlag ? this.setState({ addFavFlag: false }) : this.setState({ addFavFlag: true })
  }

  handleInput(e) {
    this.setState({
      userInput: e.target.value
    })
  }
  userLoggedIn(val){
    
    
    this.setState({ userLoggedIn: val })
    
  }
// the parameter of askForPokemon indicates by whom it is being called. 
// 0 = search box, 1 = user pokemon field
// the second param will be the name of pokmeon to search  
askForPokemon(bool,str) {
    if(bool){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${str}`).then(res => {
        this.setState({
          userInput: '',          
          pokemon01: res.data,
          normalSprite01: res.data.sprites.front_default,
          type01: res.data.types[0].type.name,
          shinySprite01: res.data.sprites.front_shiny,
          moves01: res.data.moves
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
        moves: res.data.moves
      })
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

  


  render() {

    return (
      <div className="App" id="App-container">
        <div className="app-header">SUPERCOOL POKE-API PROJECT userLoggedIn:{+this.state.userLoggedIn}</div>
        <section className="app-body">


          {/*LEFT SIDE ================================================================================================  */}
          <div className="app-left-side">
            <div className="search-box">
              <h3>Press enter to search</h3>

              <input placeholder="enter a pokemon" value={this.state.userInput} onChange={this.handleInput} onKeyPress={this.handleKeypress} />
            </div>
            <SearchHistory storedInput={this.state.storedInput} userLoggedIn={this.userLoggedIn} 
            pokemon={this.state.pokemon} addFavFlag={this.state.addFavFlag} hitFavFlag={this.hitFavFlag} 
            pokemon={this.state.pokemon} askForPokemon={this.askForPokemon}/>
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
            // secondary set pokemon data
            pokemon01={this.state.pokemon01}
            normalSprite01={this.state.normalSprite01}
            shinySprite01={this.state.shinySprite01}
            type01={this.state.type01}
            moves01={this.state.moves01}
            />





          </div>
          {/*================================================================================================  */}
        </section>

      </div>
    );
  }
}

export default App;
