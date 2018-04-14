import React, { Component } from 'react';
require('../../../css/profile.css');

const Config = require('Config');

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            votes: [],
            favorites: []
        }
        console.log(Config.apiURL)
    }

    componentDidMount() {
        let email = 'marco@gmail.com'
        fetch(Config.apiURL + '/profile/' + email)
        .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        comments: data.comments,
                        votes : data.votes,
                        favorites : data.favorites
                    })
                });
            }
        )
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }

    render() {
        /*const {votes} = this.state;

          // total number of stars
        const starTotal = 5;
          
        for(const rating in votes) {  
            const starPercentage = (votes[rating] / starTotal) * 100;
            const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
            document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
        }*/
        return (
            <div>
                {/*<!-- Comment section start -->*/}
                <div className="comments">
                <h3><span>Your comments on our vegan recipes</span></h3>
                {
                    this.state.comments.map((comment, index) => (
                        <div key={index}> <h6>Comment on {comment.recipe}</h6> {comment.content}
                        <p className="commenttime">{comment.commenttime}</p> </div>
                    ))
                }
                </div>
                {/*<!-- Comment section end -->*/}

                {/*<!-- Vote section start -->*/}
                <div className="votes">
                <h3><span>Your voted vegan recipes</span></h3>
                {
                    this.state.votes.map((vote, index) => (
                        <div key={index}> {vote.recipe}
                        <div className="stars-outer">
                            <div className="stars-inner"></div>
                        </div>
                        </div>
                    ))
                }

                {/*
                    this.state.votes.map((vote, index) => (
                        <div key={index}> {vote.recipe} {vote.rating}
                        <p className="rating">
                        <input type="radio" name="rating" id="str5" value="5" class="radio-btn hide"/><label for="str5">☆</label>
                        <input type="radio" name="rating" id="str4" value="4" class="radio-btn hide"/><label for="str4">☆</label>
                        <input type="radio" name="rating" id="str3" value="3" class="radio-btn hide"/><label for="str3">☆</label>
                        <input type="radio" name="rating" id="str2" value="2" class="radio-btn hide"/><label for="str2">☆</label>
                        <input type="radio" name="rating" id="str1" value="1" class="radio-btn hide"/><label for="str1">☆</label>
                        </p>
                        </div>
                    ))
                */}
                </div>
                {/*<!-- Vote section end -->*/}
{/*
<div class="rating">
    <input type="radio" name="rating" id="str5" value="5" class="radio-btn hide"/><label for="str5">☆</label>
    <input type="radio" name="rating" id="str4" value="4" class="radio-btn hide"/><label for="str4">☆</label>
    <input type="radio" name="rating" id="str3" value="3" class="radio-btn hide"/><label for="str3">☆</label>
    <input type="radio" name="rating" id="str2" value="2" class="radio-btn hide"/><label for="str2">☆</label>
    <input type="radio" name="rating" id="str1" value="1" class="radio-btn hide"/><label for="str1">☆</label>
</div>
*/}
                {/*<!-- Favorite section start -->*/}
                <div className="favorites">
                <h3><span>Your favorite vegan recipes</span></h3>
                {
                    this.state.favorites.map((favorite, index) => (
                        <div key={index}> {favorite.recipe} </div>
                    ))
                }
                </div>
                {/*<!-- Favorite section end -->*/}

            </div>
        ); 
    }
}