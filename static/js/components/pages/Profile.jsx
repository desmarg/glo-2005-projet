import React, { Component } from 'react';

const Config = require('Config');

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            votes: [],
            favorites: []
        }
        console.log(Config.apiURL)
    }

    componentDidMount() {
        let email = 'marco@gmail.com'
        fetch(Config.apiURL + '/profile/' + email)
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({comments: data})
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