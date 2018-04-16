import React, { Component } from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid footer-container">
                <footer className="footer">
                    <div className="footer-lists">
                        <div className="row">
                            <div className="col-sm">
                                <h4>GLO-2005 Projet de session</h4>
                                <p>Réalisé par l'équipe 13. Session d'hiver 2018.</p>
                                <p className="social-icons">
                                    <a href="https://github.com/desmarg/glo-2005-projet"><i className="fab fa-github fa-2x"></i></a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                            <p className="text-center">Free Bootstrap Template by <a href="https://zypopwebtemplates.com/">ZyPop</a>.</p>
                            <p className="text-center"><a href="#">Back to top</a></p>
                    </div>
                </footer>
            </div>
        )
    }
}