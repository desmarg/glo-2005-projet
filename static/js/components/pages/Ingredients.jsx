import React, { Component } from 'react';

const Config = require('Config');

export default class Ingredients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: []
        }
        console.log(Config.serverUrl)
    }

    componentDidMount() {
        fetch(Config.serverUrl + '/ingredients')
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(function(data) {
                    console.log(data);
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    render() {
        return (
            <div> </div>
        )
    }
}