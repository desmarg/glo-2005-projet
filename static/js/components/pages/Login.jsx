import React from 'react';
import { Link } from 'react-router-dom';
import requireNoAuthentication from '../../higher-order-components/requireNoAuthentication';
require('../../../css/login.css');
const Config = require('Config');

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errorMessage: "",
            email: "",
            password: ""
        }
    }

    verifyCredentials() {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (!emailRegex.test(this.state.email)) {
            this.setState({
                errorMessage: "L'adresse email n'est pas valide"
            })
            return false
        }
        if (this.state.password.length === 0) {
            this.setState({
                errorMessage: "Veuillez entrer un mot de passe"
            })
            return false
        }
        return true
    }

    login() {
        if (this.state.loading) {
            return
        }
        if (!this.verifyCredentials()) {
            return
        }
        this.setState({
            loading: true
        })
        fetch(Config.apiURL + '/auth/login', { 
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: this.state.email,
                password: this.state.password
            }),
        })
        .then(res => {
            if (res.status === 401) {
                this.setState({
                    loading: false,
                    errorMessage: "Mauvais combinaison d'email et de mot de passe"
                })
            } else if (res.status == 200) {
                res.json().then(response => {
                    localStorage.setItem(Config.localTokenKey, response.userToken)
                    this.props.history.push('/home')
                })
            }
            else {
                this.setState({
                    loading: false,
                    errorMessage: "Il y a eu une erreur, veuillez recommencer."
                })
            }
        }).catch(error => {
            this.setState({
                loading: false,
                errorMessage: "Il y a eu une erreur, veuillez recommencer."
            })
        })
    }

    handleChange(field, event) {
        this.setState({[field]: event.target.value})
    }

    render() {
        let inputOptions = {
            "readOnly": this.state.loading ? "readOnly" : ""
        }

        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={e => e.preventDefault()}>
                        <input type="email" value={this.state.email} onChange={e => this.handleChange("email", e)} placeholder="Adresse email" {...inputOptions}/>
                        <input type="password" value={this.state.password} onChange={e => this.handleChange("password", e)} placeholder="Mot de passe" {...inputOptions}/>
                        <button onClick={() => this.login()}>
                            {
                                this.state.loading ?
                                "Un instant..."
                                :
                                "Connexion"
                            }
                        </button>
                        <p className="message">Pas de compte? <Link to="/register">Créer un compte</Link></p>
                        </form>
                    <div style={{color: "red"}}>
                        {this.state.errorMessage}
                    </div>
                </div>
            </div>
        )
    }
}

export default requireNoAuthentication(Login)