import React, { Component } from 'react'

export default class SearchHistory extends Component {
    constructor(props) {
        super(props)

    }
    doSomething() {
        alert('quo usque tandem?')
    }
    render() {

        return (
            <div id="SearchHistory-component">
                <h1>Recent searches:</h1>
                <ul>
                    {

                        this.props.storedInput.map((e, i) => (
                            <li key={i} onClick={this.doSomething}>{e}</li>
                        ))
                    }
                </ul>




            </div>


        )
    }
}