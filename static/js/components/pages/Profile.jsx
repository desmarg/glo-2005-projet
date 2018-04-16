import React, { Component } from 'react';
const Config = require('Config');

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        fetch(Config.apiURL + '/user/'+ localStorage.getItem(Config.localTokenKey))
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        userInfo: data.data
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
                <div>Hello {this.state.userInfo.firstName} {this.state.userInfo.lastName} </div>
                <div>{this.state.userInfo.email} </div>
            </div>
        )
    }
}