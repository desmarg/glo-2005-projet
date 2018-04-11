import React, { Component } from 'react';
import requireNoAuthentication from '../../higher-order-components/requireNoAuthentication';
import { Link } from 'react-router-dom';
require('../../../css/login.css');

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errorMessage: "",
            email: "",
            firstName: "",
            lastName: "",
            password: ""
        }
    }

    verifyCredentials() {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")

        if (!emailRegex.test(this.state.email)) {
            this.setState({
                errorMessage: "L'adresse email n'est pas valide"
            })
            return false
        }
        if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
            this.setState({
                errorMessage: "Veuillez entrer votre nom"
            })
            return false
        }
        if (!passwordRegex.test(this.state.password)) {
            this.setState({
                errorMessage: "Le mot de passe doit avoir un minimum de 8 caratères, au moins une lettre minuscule, une lettre majuscule et un chiffre."    
            })
            return false
        }
        return true
    }

    register() {
        if (this.state.loading) {
            return
        }
        if (!this.verifyCredentials()) {
            return
        }
        this.setState({
            loading: true
        })
        fetch('/api/auth/register', { 
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password
            }),
        })
        .then(res => {
            if (res.status === 409) {
                this.setState({
                    loading: false,
                    errorMessage: "Cet utilisateur existe déjà."
                })
            } else if (res.status == 200) {
                res.json().then(response => {
                    localStorage.setItem("glo-2005-token", response.userToken)
                    this.props.history.push('/home')
                })
            }
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
                    <input type="text" value={this.state.email} onChange={e => this.handleChange("email", e)} placeholder="Adresse email" {...inputOptions}/>
                    <input type="text" value={this.state.firstName} onChange={e => this.handleChange("firstName", e)} placeholder="Prénom" {...inputOptions}/>
                    <input type="text" value={this.state.lastName} onChange={e => this.handleChange("lastName", e)} placeholder="Nom" {...inputOptions}/>
                    <input type="password" value={this.state.password} onChange={e => this.handleChange("password", e)} placeholder="Mot de passe" {...inputOptions}/>
                    <button onClick={() => this.register()}>
                    {
                        this.state.loading ?
                        "Un instant..."
                        :
                        "Créer mon compte"
                    }
                </button>
                <p className="message">Déjà un compte? <Link to="/login">Se connecter</Link></p> 
                </form>
                <div style={{color: "red"}}>
                    {this.state.errorMessage}
                </div>
            </div>
        </div>
        )
    }
}

export default requireNoAuthentication(Register)