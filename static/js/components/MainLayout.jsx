import * as React from 'react';
import Home from "./Home";
import requireAuthentication from '../higher-order-components/requireAuthentication';
import Login from './Login';
import Sidebar from "./Sidebar";
import InnerContent from "./InnerContent";

// URL params are stored  in props.match.params.nameOfParam

export default class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <Sidebar />
            </div>
        )
    }
}