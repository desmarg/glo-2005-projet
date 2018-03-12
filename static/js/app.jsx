import React from "react";
import { Switch, Route } from 'react-router-dom';
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";

export default class App extends React.Component {
  render() {
    return (
        <div>
            <Switch>
                <Route path='/' component={MainLayout} />
                <Route path='/login' component={Login} />
            </Switch>
        </div>
    )
  }
}