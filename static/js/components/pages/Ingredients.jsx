import React, { Component } from 'react';

const Config = require('Config');

export default class Ingredients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: []
        }
    }

    componentDidMount() {
        fetch(Config.apiURL + '/ingredients')
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        ingredients: data
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    onSearchChange(e) {
        fetch(Config.apiURL + '/ingredients?search=' + e.target.value)
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        ingredients: data
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={e => this.onSearchChange(e)}/>
                {
                    this.state.ingredients.map(ingredient => (
                        <div key={ingredient.id}> {ingredient.name} </div>
                    ))
                }
            </div>
        )
    }
}