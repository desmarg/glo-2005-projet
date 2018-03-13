import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';

export default class InnerContentRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='*' component={Home} />
                </Switch>
            </div>
        )
    }
}