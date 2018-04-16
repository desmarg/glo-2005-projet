import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
const Config = require('Config');

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        fetch(Config.apiURL + '/user/'+ localStorage.getItem(Config.localTokenKey))
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        userInfo: data.data
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
                <h2 className="article-title">Mon profil</h2>
                <div style={{color: "black"}}>Bonjour {this.state.userInfo.firstName} {this.state.userInfo.lastName} </div>

                <h3>Mes commentaires</h3>
                {
                    this.state.userInfo.comments ?
                    this.state.userInfo.comments.map((comment, index) => (
                        <div style={{cursor: "pointer"}} key={index} onClick={() => this.props.history.push('/recipes/'+ comment.recipe.id)}>
                            <b>{comment.recipe.name}</b>: {comment.content}
                        </div>
                    ))
                    : null
                }

                <h3>Mes votes</h3>
                {
                    this.state.userInfo.votes ?
                    this.state.userInfo.votes.map((vote, index) => (
                        <div key={index} style={{cursor: "pointer"}} onClick={() => this.props.history.push('/recipes/' + vote.recipe.id)}>
                            <span>
                                <b>{vote.recipe.name}</b>
                                <StarRatingComponent 
                                    name="rating" 
                                    starCount={5}
                                    value={vote.rating}
                                />
                            </span>
                        </div>
                    ))
                    : null
                }
            </article>
        )
    }
}

export default withRouter(Profile)