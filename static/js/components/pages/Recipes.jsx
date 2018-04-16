import React, { Component } from 'react';
import RecipeThumbnail from '../other/recipeThumbnail';
const Config = require('Config');

export default class Recipes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userRecipes: []
        }
    }

    componentDidMount() {
        fetch(Config.apiURL + '/user/' + localStorage.getItem(Config.localTokenKey) + '/recipes')
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        userRecipes: data.data
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
            <article>
                <div>
                    <h2 className="article-title">Mes recettes</h2>
                    <div>Ici se trouve les recettes contenant un ou plusieurs de vos ingrédients</div>
                    {
                        this.state.userRecipes.map(recipe => (<RecipeThumbnail recipe={recipe} key={recipe.id}/>))
                    }
                </div>
            </article>
        )
    }
}