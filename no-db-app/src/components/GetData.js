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
                        <div> {+this.props.userLoggedIn}
                <img className="sprite-img" src={this.props.shiny === 'shiny' ? this.props.normalSprite : this.props.shinySprite} alt="" />
                <span className="button-bar">
                <button className="confirm-button" onClick={this.props.makeShiny}>{this.props.shiny}</button>
                <button className="confirm-button" disabled={this.props.userLoggedIn && ( this.props.pokemon.name )  ? false : true }
                    onClick={this.props.hitFavFlag}>Favorites</button>
                </span>        
                        </div>
                </div>    
                <div className="right-data">
                        <div className="moves-window">moves: <ul> {this.props.moves.map((e,i)=><li key={i}>{e.move.name}</li>)} </ul></div>
                </div>
                {/*---------------secondary pokemon display--------------------*/}
                <div className="left-data">
                    
                        <div>Name: {this.props.pokemon01.name} </div>
                        <div>type: {this.props.type01} </div>
                        <div> 
                <img className="sprite-img" src={this.props.normalSprite01} alt="" />
                <span className="button-bar">
                <button className="confirm-button" disabled onClick={this.props.makeShiny}>{this.props.shiny}</button>
                <button className="confirm-button" disabled 
                    onClick={this.props.hitFavFlag}>Favorites</button>
                </span>        
                        </div>
                </div>    
                <div className="right-data">
                        <div className="moves-window">moves: <ul> {this.props.moves01.map((e,i)=><li key={i}>{e.move.name}</li>)} </ul></div>
                </div>
            </div>
        )
    }
} /* close component */ 