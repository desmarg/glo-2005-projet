import React from 'react';

require('../../css/styles.css');

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        console.log('in')
    }
    render() {
        return (
            <div id="sidebar">
                      
                <div className="navbar-expand-md navbar-dark"> 
                
                    <header className="d-none d-md-block">
                        <h1><span>my</span>website</h1>
                    </header>
                    
                    
                    <div className="mobile-header-controls">
                        <a className="navbar-brand d-md-none d-lg-none d-xl-none" href="#"><span>my</span>website</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#SidebarContent" aria-controls="SidebarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
            
                    <div id="SidebarContent" className="collapse flex-column navbar-collapse">
    
                            
                        
                        <nav className="navbar navbar-dark">
                            <div id="mainNavbar">
                                <ul className="flex-column mr-auto">
                                    <li className="nav-item">
                                            <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                                    </li>

                                    <li className="nav-item active dropdown">
                                                <a className="nav-link dropdown-toggle" href="#MenuDropdown" data-toggle="collapse" aria-controls="MenuDropdown" aria-expanded="false">Examples &amp; Pages</a>
                                                <ul id="MenuDropdown" className="sub-navbar collapse flex-column">
                                                    <li className="nav-item"><a className="nav-link" href="examples.html">Style Examples</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="three-column.html">Three Column</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="one-column.html">One column / no sidebar</a></li>
                                                    <li className="nav-item"><a className="nav-link"  href="text.html">Text / left sidebar</a></li>
                                                </ul>
                                    </li>


                                    <li className="nav-item">
                                            <a className="nav-link" href="#">Services</a>
                                    </li>

                                    <li className="nav-item">
                                            <a className="nav-link" href="#">Products</a>
                                    </li>

                                    <li className="nav-item">
                                            <a className="nav-link" href="#">Contact</a>
                                    </li>
                                </ul>
                            </div>   
                        </nav>
                    
                    
                    
                        <form className="form-inline sidebar-search-form my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" size="10"  placeholder="Search" aria-label="Search" />
                            <button className="btn my-2 my-sm-0" type="submit">Search</button>
                        </form>
            

                        <p className="sidebar-social-icons social-icons">
                            <a href="#"><i className="fa fa-facebook fa-2x"></i></a>
                            <a href="#"><i className="fa fa-twitter fa-2x"></i></a>
                            <a href="#"><i className="fa fa-youtube fa-2x"></i></a>
                            <a href="#"><i className="fa fa-instagram fa-2x"></i></a>
                        </p>
                    
                    </div>
                </div> 
            </div>
        )
    }
}