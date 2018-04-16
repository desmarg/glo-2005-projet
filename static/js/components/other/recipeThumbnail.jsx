import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { withRouter } from "react-router-dom";
const Config = require('Config');
require("../../../css/recipeThumbnail.css");

const RecipeThumbnail = props => {
    return (
        <div style={{cursor: "pointer"}} onClick={() => props.history.push('/recipes/' + props.recipe.id)}>
            <span>
                <b>{props.recipe.name}</b> ({props.recipe.totalTime} minutes )
                <StarRatingComponent 
                    name="rating" 
                    starCount={5}
                    value={props.recipe.rating}
                />
            </span>
        </div>
    )
}

export default withRouter(RecipeThumbnail)