import React from 'react';

export default class InnerContent extends React.Component {
    render() {
        return (
            <div id="inner-content">
                <div id="content-wrapper">

                    <div className="jumbotron-wrap">
                        <div className="container-fluid">
                            <div className="jumbotron static-slider">
                                <h1 className="text-center">One column layout</h1>
                                <p className="lead text-center">With a static slider.</p>
                            </div>
                        </div>
                    </div>

                    <main className="container-fluid">
                        <div className="row">

                            <div className="col">
                                <article>
                                    <h2 className="article-title">Introduction to overflow</h2>

                                    <p className="article-meta">Posted on <time dateTime="2017-05-14">14 May</time> by <a href="#" rel="author">Joe Bloggs</a></p>

                                    <p>Welcome to overflow, a free CSS3 &amp; HTML5 responsive web template from <a href="https://zypopwebtemplates.com/" title="ZyPOP">ZyPOP</a>. This template is completely <strong>free</strong> to use permitting a link remains back to  <a href="https://zypopwebtemplates.com/" title="ZyPOP">https://zypopwebtemplates.com/</a>.</p>

                                    <p> Should you wish to use this template unbranded you can buy a template license from our website for 8.00 GBP, this will allow you remove all branding related to our site, for more information about this see below.</p>	

                                    <p>This template has been tested in:</p>

                                    <ul>
                                        <li>Firefox</li>
                                        <li>IE / Edge</li>
                                        <li>Chrome</li>
                                        <li>Safari</li>
                                        <li>iOS / Android</li>
                                    </ul>


                                    <a href="#" className="btn btn-primary">Read more</a>
                                    <a href="#" className="btn btn-secondary">Comments</a>

                                </article>

                                <article>

                                    <h2 className="article-title">Buy unbranded</h2>
                                    <p className="article-meta">Posted on <time dateTime="2017-05-14">14 May</time> by <a href="#" rel="author">Joe Bloggs</a></p>

                                    <p>Purchasing a template license for 8.00 GBP (at time of writing around 10 USD) gives you the right to remove any branding including links, logos and source tags relating to ZyPOP. As well as waiving the attribution requirement, your payment will also help us provide continued support for users as well as creating new web templates. Find out more about how to buy at the licensing page on our website which can be accessed at <a href="https://zypopwebtemplates.com/licensing" title="template license">https://zypopwebtemplates.com/licensing</a></p>

                                    <h3>Lorem lipsum</h3>

                                    <p>Morbi fermentum condimentum felis, commodo vestibulum sem mattis sed. Aliquam magna ante, mollis vitae tincidunt in, malesuada vitae turpis. Sed aliquam libero ut velit bibendum consectetur. Quisque sagittis, est in laoreet semper, enim dui consequat felis, faucibus ornare urna velit nec leo. Maecenas condimentum velit vitae est lobortis fermentum. In tristique sem vitae metus ornare luctus tempus nisl volutpat. Integer et est id nisi tempus pharetra sagittis et libero.</p>

                                    <a href="#" className="btn btn-primary">Read more</a>
                                    <a href="#" className="btn btn-secondary">Comments</a>
                                </article>


                                <nav>
                                    <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                    </ul>
                                </nav>
                            </div>        
                        </div> 
                    </main>


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
                </div>
            </div>
        )
    }
}