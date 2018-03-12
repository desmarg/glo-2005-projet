import React, { Component } from 'react';

const requireAuthentication = (component) => class extends React.Component {
    componentWillMount() {
        this.checkAuth();
        this.state = {
            isAuthenticated: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth(nextProps);
    }

    checkAuth(props = this.props) {
        const token = localStorage.getItem('glo-2005-token');        
        if (!token) {
            browserHistory.push('/login');
        } else {
            fetch('/api/is_token_valid', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token }),
            })
            .then(res => {
                if (res.status === 200) {
                    this.props.loginUserSuccess(token);
                    this.setState({
                        loaded_if_needed: true,
                    });

                } else {
                    browserHistory.push('/login');
                }
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.isAuthenticated
                    ? <Component {...this.props} />
                    : null
                }
            </div>
        );

    }
}

export default requireAuthentication