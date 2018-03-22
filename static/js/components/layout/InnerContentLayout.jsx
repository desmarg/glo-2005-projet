import React from 'react';
import InnerContentRouter from '../router/InnerContentRouter';
import Footer from './Footer';

export default class InnerContentLayout extends React.Component {
    render() {
        return (
            <div id="inner-content">
                <div id="content-wrapper">
                    <main className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <InnerContentRouter />
                        </div>
                    </div>
                    </main>
                    <Footer />
                </div>
            </div>
        )
    }
}