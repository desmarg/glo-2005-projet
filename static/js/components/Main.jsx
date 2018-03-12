import { Switch, Route } from 'react-router-dom';
import * as React from 'react';
import Home from "./Home";
import requireAuthentication from '../higher-order-components/requireAuthentication';

// URL params are stored  in props.match.params.nameOfParam

export default class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={requireAuthentication(Home)} />
                    <Route path='/home' component={requireAuthentication(Home)} />
                </Switch>
            </main>
        )
    }
}