import React from 'react';
import { Link } from 'react-router-dom';
require('../../../css/login.css')

export default class Login extends React.Component {
    render() {
        return (
            <div class="login-page">
                <div class="form">
                    <form class="login-form">
                        <input type="text" placeholder="Adresse email"/>
                        <input type="password" placeholder="Mot de passe"/>
                        <button>Connexion</button>
                        <p class="message">Pas de compte? <Link to="/register">Créer un compte</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}