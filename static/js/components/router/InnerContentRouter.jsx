import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Ingredients from '../pages/Ingredients';
import Recipes from '../pages/Recipes';

export default class InnerContentRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/ingredients' component={Ingredients} />
                    <Route path='/recipes' component={Recipes} />
                    <Route path='*' component={Home} />
                </Switch>
            </div>
        )
    }
}