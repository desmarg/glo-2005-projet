import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Recipes from "../pages/Recipes";
import RecipeDetails from "../pages/RecipeDetails";

const RecipeRouter = () => (
    <Switch>
      <Route exact path='/recipes' component={Recipes}/>
      <Route path='/recipes/:id' component={RecipeDetails}/>
    </Switch>
)

export default RecipeRouter