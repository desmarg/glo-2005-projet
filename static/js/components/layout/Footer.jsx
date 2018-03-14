import React, { Component } from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid footer-container">
                <footer className="footer">
                    <div className="footer-lists">
                        <div className="row">
                            <div className="col-sm">
                                <ul>
                                    <li><h4>Proin accumsan</h4></li>
                                    <li><a href="#">Rutrum nulla a ultrices</a></li>
                                    <li><a href="#">Blandit elementum</a></li>
                                    <li><a href="#">Proin placerat accumsan</a></li>
                                    <li><a href="#">Morbi hendrerit libero </a></li>
                                    <li><a href="#">Curabitur sit amet tellus</a></li>
                                </ul>
                            </div>
                            <div className="col-sm">
                                <ul>
                                    <li><h4>Condimentum</h4></li>
                                    <li><a href="#">Curabitur sit amet tellus</a></li>
                                    <li><a href="#">Morbi hendrerit libero </a></li>
                                    <li><a href="#">Proin placerat accumsan</a></li>
                                    <li><a href="#">Rutrum nulla a ultrices</a></li>
                                    <li><a href="#">Cras dictum</a></li>
                                </ul>
                            </div>   
                            <div className="col-sm">
                                <ul>
                                    <li><h4>Suspendisse</h4></li>
                                    <li><a href="#">Morbi hendrerit libero </a></li>
                                    <li><a href="#">Proin placerat accumsan</a></li>
                                    <li><a href="#">Rutrum nulla a ultrices</a></li>
                                    <li><a href="#">Curabitur sit amet tellus</a></li>
                                    <li><a href="#">Donec in ligula nisl.</a></li>
                                </ul>
                            </div>
                            <div className="col-sm">
                                <h4>Suspendisse</h4>
                                <p>Integer mattis blandit turpis, quis rutrum est. Maecenas quis arcu vel felis lobortis iaculis fringilla at ligula. Nunc dignissim porttitor dolor eget porta.</p>
                                <p className="social-icons">
                                    <a href="#"><i className="fa fa-facebook fa-2x"></i></a>
                                    <a href="#"><i className="fa fa-twitter fa-2x"></i></a>
                                    <a href="#"><i className="fa fa-youtube fa-2x"></i></a>
                                    <a href="#"><i className="fa fa-instagram fa-2x"></i></a>
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