import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
const Config = require('Config');

export default class RecipeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {},
            userVote: 0,
            userComment: "",
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

    sendComment() {
        if (this.state.userComment.length === 0)  {
             return
        }
        fetch(Config.apiURL + '/user/' + localStorage.getItem(Config.localTokenKey) + '/comments/id/' + this.props.match.params.id, { 
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userComment: this.state.userComment
            }),
        })
        .then(res => {
            res.json().then(response => {
                this.setState({
                    recipe: response.data,
                    userComment: ""
                });
            })
        }).catch(error => {
            this.setState({
                errorMessage: "Il y a eu une erreur, veuillez recommencer."
            })
        })
    }

    onCommentChange(event) {
        this.setState({
            userComment: event.target.value
        })
    }

    render() {
        const recipe = this.state.recipe
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
                    <div className="row">
                        <div className="col col-md-2">
                            Votre commentaire:
                        </div>
                        <div className="col col-md-6">
                            <textarea onChange={e => this.onCommentChange(e)} style={{ width: "100%", height: "200px"}} type="text" value={this.state.userComment}/>
                            <button onClick={() => this.sendComment()}>Envoyer</button>
                        </div>
                    </div>
                    <h3>Commentaires:</h3>
                    {
                        recipe.comments ?
                        recipe.comments.map((comment, index) => (
                            <div key={index}>
                                <b>{comment.email}</b>: {comment.content}
                            </div>
                        ))
                        :
                        null
                    }
                </div>
            </article>
        )
    }
}