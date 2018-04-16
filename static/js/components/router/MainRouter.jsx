import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={Login} /> 
                    <Route path='/register' component={Register} />
                    <Route path='/' component={MainLayout} />
                </Switch>
            </div>
        )
    }
}