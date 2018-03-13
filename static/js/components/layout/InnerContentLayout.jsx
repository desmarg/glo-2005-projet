import React from 'react';
import InnerContentRouter from '../router/InnerContentRouter';
import Footer from './Footer';

export default class InnerContentLayout extends React.Component {
    render() {
        return (
            <div id="inner-content">
                <div id="content-wrapper">
                    <main className="container-fluid">
                       <InnerContentRouter />
                    </main>
                    <Footer />
                </div>
            </div>
        )
    }
}