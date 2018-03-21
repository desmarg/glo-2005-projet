import * as React from 'react';

export default class Home extends React.Component {
    render() {
        return (
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
        )
    }
}