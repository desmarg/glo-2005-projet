import React, { Component } from 'react';

export default class Jumbotron extends React.Component {
    render() {
        return (
            <div className="jumbotron-wrap">
                <div className="container-fluid">
                    <div className="jumbotron static-slider">
                        <h1 className="text-center">Recette</h1>
                        <p className="lead text-center">Bla Bla Bla</p>
                    </div>
                </div>
            </div>
        )
    }
}