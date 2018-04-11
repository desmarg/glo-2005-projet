import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

const requireNoAuthentication = (Component) => withRouter(class extends React.Component {
    componentWillMount() {
        this.setState({
            isAuthenticated: true
        })
        this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps)
    }

    checkAuth(props = this.props) {
            const token = localStorage.getItem('glo-2005-token')     
            if (!token) {
                this.setState({
                    isAuthenticated: false
                })
            } else {
                fetch('/api/auth/verifytoken', { 
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userToken: token }),
                })
                .then(res => {
                    if (res.status === 200) {
                        props.history.push('/home')
                    } else {
                        localStorage.removeItem('glo-2005-token')
                        this.setState({
                            isAuthenticated: false
                        })
                    }
                })
            }
    }

    render() {
        return (
            <div>
            {
                this.state.isAuthenticated ? null : <Component {...this.props} />
            }
            </div>     
        )
    }
})

export default requireNoAuthentication