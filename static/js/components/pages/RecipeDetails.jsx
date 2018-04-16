import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
const Config = require('Config');

export default class RecipeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {},
            userVote: 0,
            comment: []
        }
    }

    componentDidMount() {
        fetch(Config.apiURL + '/recipes/id/' + this.props.match.params.id)
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        recipe: data.data
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });

        fetch(Config.apiURL + '/user/' + localStorage.getItem(Config.localTokenKey) + '/votes/id/' + this.props.match.params.id)
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        userVote: data.data.rating
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    onStarClick(nextValue, prevValue, name) {
        fetch(Config.apiURL + '/user/' + localStorage.getItem(Config.localTokenKey) + '/votes/id/' + this.props.match.params.id, { 
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userVote: nextValue
            }),
        })
        .then(res => {
            res.json().then(response => {
                this.setState({userVote: response.data.rating});
            })
        }).catch(error => {
            this.setState({
                errorMessage: "Il y a eu une erreur, veuillez recommencer."
            })
        })  
    }

    render() {
        const recipe = this.state.recipe
        console.log(this.state.userVote)
        return (
            <article>
                <div>
                    <h2 className="article-title">{recipe.name}</h2>
                    <StarRatingComponent 
                        name="rating" 
                        starCount={5}
                        value={recipe.rating}
                    />
                    <div>Temps de préparation: {recipe.prepTime}min</div> 
                    <div>Temps total: {recipe.totalTime}min</div>

                    <div style={{color: "black"}}>
                        <b>Description: </b>
                        <p>
                            {recipe.description}
                        </p>
                    </div>
                </div>
                <div>
                    <h3> Qu'en pensez-vous? </h3>
                    <span>Votre vote: <StarRatingComponent 
                        name="rating" 
                        starCount={5}
                        value={this.state.userVote}
                        onStarClick={this.onStarClick.bind(this)}
                    /></span>
                </div>
            </article>
        )
    }
}