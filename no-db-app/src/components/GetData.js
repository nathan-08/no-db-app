import React, { Component } from 'react';
import axios from 'axios'

export default class GetData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 'x',
        }
    }
    render() {
        return (
            <div id="GetData-component">
                <div className="left-data">
                    
                        <div>Name: {this.props.pokemon.name} </div>
                        <div>type: {this.props.type} </div>
                        <div>
                <img className="sprite-img" src={this.props.shiny === 'shiny' ? this.props.normalSprite : this.props.shinySprite} alt="" />
                <span className="button-bar">
                <button className="confirm-button" onClick={this.props.makeShiny}>{this.props.shiny}</button>
                <button className="confirm-button" >Add to Favorites</button>
                </span>        
                        </div>
                </div>    
                <div className="right-data">
                        <div className="moves-window">moves: <ul> {this.props.moves.map(e=><li>{e.move.name}</li>)} </ul></div>
                </div>
                
            </div>
        )
    }
} /* close component */ 