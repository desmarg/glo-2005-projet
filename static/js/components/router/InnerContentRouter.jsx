import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Ingredients from '../pages/Ingredients';
<<<<<<< HEAD
import Recipes from '../pages/Recipes';
=======
import Profile from '../pages/Profile';
>>>>>>> e8d2be58a72b89aa66a94c25e2d54544a439891a

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
<<<<<<< HEAD
                    <Route path='/recipes' component={Recipes} />
=======
                    <Route path='/profile' component={Profile} />
>>>>>>> e8d2be58a72b89aa66a94c25e2d54544a439891a
                    <Route path='*' component={Home} />
                </Switch>
            </div>
        )
    }
}