import * as React from 'react';
import requireAuthentication from '../../higher-order-components/requireAuthentication';
import Sidebar from "./Sidebar";
import InnerContentLayout from "./InnerContentLayout";

// URL params are stored  in props.match.params.nameOfParam

class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <Sidebar />
                <InnerContentLayout />
            </div>
        )
    }
}

export default requireAuthentication(MainLayout)