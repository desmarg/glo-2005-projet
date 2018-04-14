import React, { Component } from 'react';

const Config = require('Config');

export default class Ingredients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: [],
            userIngredients: []
        }

        this.isIngredientInUsers = this.isIngredientInUsers.bind(this)
    }

    componentDidMount() {
        fetch(Config.apiURL + '/user/' + localStorage.getItem(Config.localTokenKey) + '/ingredients')
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        userIngredients: data.data
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    onSearchChange(e) {
        fetch(Config.apiURL + '/ingredients?search=' + e.target.value)
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        ingredients: data.data
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    isIngredientInUsers(id) {
        if (this.state.userIngredients.find(entry => entry.id === id) === undefined) {
            return false
        }
        return true
    }

    render() {
        return (
            <article>
                <div className="row">
                    <div className="col col-md-5">
                        <h2 className="article-title">Ingrédients </h2>
                        <div>Cliquez sur un ingrédient pour l'ajouter à votre garde-manger.</div>
                        <div style={{marginTop: "20px"}}>
                            <input type="text" onChange={e => this.onSearchChange(e)}/>
                            <div>
                                {
                                    this.state.ingredients.length > 0 ?
                                    this.state.ingredients.map(ingredient => (
                                        <div key={ingredient.id}>
                                        <span> 
                                            {ingredient.name} 
                                            {
                                                this.isIngredientInUsers(ingredient.id) ? 
                                                <span style={{marginLeft: "10px", color: "green"}}><i className="fas fa-check"></i></span>
                                                :
                                                null
                                            } 
                                        </span>
                                        </div>
                                    ))
                                    :
                                    "Cherchez un ingrédient pour commencer!"
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-5">
                        <h2 className="article-title">Mes ingrédients</h2>
                        <div style={{marginTop: "20px"}}>
                            <div>
                                {
                                    this.state.userIngredients.map(ingredient => (
                                        <div key={ingredient.id}>
                                            <span>
                                                {ingredient.name}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}