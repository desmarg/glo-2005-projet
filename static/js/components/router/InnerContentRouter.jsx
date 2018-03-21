import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Ingredients from '../pages/Ingredients';

export default class InnerContentRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/ingredients' component={Ingredients} />
                    <Route path='*' component={Home} />
                </Switch>
            </div>
        )
    }
}