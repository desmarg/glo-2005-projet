import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="login-page">
            <div class="form">
                <form class="login-form">
                    <input type="text" placeholder="Adresse email"/>
                    <input type="text" placeholder="Prénom"/>
                    <input type="text" placeholder="Nom"/>
                    <input type="password" placeholder="Mot de passe"/>
                    <button>Créer mon compte</button>
                    <p class="message">Déjà un compte? <Link to="/login">Se connecter</Link></p>
                </form>
            </div>
        </div>
        )
    }
}