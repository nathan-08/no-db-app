import React, { Component } from 'react'

export default class SearchHistory extends Component {
    constructor(props){
        super(props)

    }
render(){
    return(
        <div id="SearchHistory-component">
            <h1>Recent searches:</h1>
            <ul>
                {
                    let x = this.props.storedInput.slice(0)
                    x.map((e, i)=>{
                        <li key={i}>{e}</li>
                    })
                }
            </ul>



        </div>


    )
}




}