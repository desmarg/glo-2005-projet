import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
const Config = require('Config');

const requireAuthentication = (Component) => withRouter(class extends React.Component {
    componentWillMount() {
        this.setState({
            isAuthenticated: false
        })
        this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps)
    }

    checkAuth(props = this.props) {
        const token = localStorage.getItem(Config.localTokenKey);        
        if (!token) {
            props.history.push('/login')
        } else {
            fetch(Config.apiURL + '/auth/verifytoken', { 
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ userToken: token }),
            })
            .then(res => {
                if (res.status !== 200) {
                    props.history.push('/login')
                } else {
                    this.setState({
                        isAuthenticated: true
                    })
                }
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isAuthenticated ? <Component {...this.props} /> : null
                }
            </div>
        )
    }
})

export default requireAuthentication