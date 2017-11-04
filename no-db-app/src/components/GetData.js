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
                <table className="pokemon-display-table">
                    <tr>
                        <td>Name: {this.props.pokemon.name} </td>
                        <td>type: {this.props.type} </td>
                        <td>sprite:
                <img className="sprite-img" src={this.props.shiny === 'shiny' ? this.props.normalSprite : this.props.shinySprite} alt="" />
                <button className="confirm-button" onClick={this.props.makeShiny}>{this.props.shiny}</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="moves-window">moves: {this.props.moves.map(e=>`${e.move.name}\n`)} </td>
                    </tr>
                </table>
            </div>
        )
    }
} /* close component */ 