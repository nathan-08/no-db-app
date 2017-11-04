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
      addFavFlag: false
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
    
    
    this.setState({ userLoggedIn: true })
    
  }

  askForPokemon() {
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
      {/*TODO IF already exists in stored INput, do not add*/ }

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
        <div className="app-header">SUPERCOOL POKE-API PROJECT {+this.state.userLoggedIn}{+this.state.addFavFlag}</div>
        <section className="app-body">


          {/*LEFT SIDE ================================================================================================  */}
          <div className="app-left-side">
            <div className="search-box">
              <h3>Press enter to search</h3>

              <input placeholder="enter a pokemon" value={this.state.userInput} onChange={this.handleInput} onKeyPress={this.handleKeypress} />
            </div>
            <SearchHistory storedInput={this.state.storedInput} userLoggedIn={this.userLoggedIn} 
            pokemon={this.state.pokemon} addFavFlag={this.state.addFavFlag} hitFavFlag={this.hitFavFlag} pokemon={this.state.pokemon}/>
            {/*SERVER TEST+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
            
          </div>


        

          {/*RIGHT SIDE ================================================================================================  */}
          <div className="app-right-side"> 
            <h3>Pokedex</h3>

            <GetData className="GetData" userInput={this.state.userInput} userLoggedIn={this.state.userLoggedIn}
            hitFavFlag={this.hitFavFlag}  pokemon={this.state.pokemon} normalSprite={this.state.normalSprite}
              shinySprite={this.state.shinySprite} type={this.state.type} makeShiny={this.makeShiny}
              shiny={this.state.shiny} askForPokemon={this.askForPokemon} moves={this.state.moves} />





          </div>
          {/*================================================================================================  */}
        </section>

      </div>
    );
  }
}

export default App;
