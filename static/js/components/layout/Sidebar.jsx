import React from 'react';
import { withRouter, Link } from 'react-router-dom';
const Config = require('Config');

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           activeRoute: props.location.pathname.split("/")[1]
        }
        this.getNavLinkClass = this.getNavLinkClass.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeRoute: nextProps.location.pathname.split("/")[1]
         })
    }

    logout() {
        let token = localStorage.getItem(Config.localTokenKey)
        fetch(Config.apiURL + '/auth/logout', { 
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                userToken: token
            }),
        })
        .then(res => {
            localStorage.deleteItem(Config.localTokenKey)
            this.props.history.push('/login')
        }).catch(error => {

        })
    }

    getNavLinkClass(linkRoute) {
        return linkRoute === this.state.activeRoute ? "nav-item active" : "nav-item"
    }

    render() {
        return (
            <div id="sidebar">
                      
                <div className="navbar-expand-md navbar-dark"> 
                
                    <header className="d-none d-md-block">
                        <h1><span>Glo-2005</span>Recettes</h1>
                    </header>
                    
                    
                    <div className="mobile-header-controls">
                        <a className="navbar-brand d-md-none d-lg-none d-xl-none" href="#"><span>Glo-2005</span>Recettes</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#SidebarContent" aria-controls="SidebarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
            
                    <div id="SidebarContent" className="collapse flex-column navbar-collapse">
    
                            
                        
                        <nav className="navbar navbar-dark">
                            <div id="mainNavbar">
                                <ul className="flex-column mr-auto">
                                    <li className={this.getNavLinkClass("home")}>
                                        <Link className="nav-link" to="/home">Accueil</Link>
                                    </li>

                                    <li className={this.getNavLinkClass("recipes")}>
                                            <Link className="nav-link" to="/recipes">Recettes</Link>
                                    </li>

                                    <li className={this.getNavLinkClass("ingredients")}>
                                            <Link className="nav-link" to="/ingredients">Ingredients</Link>
                                    </li>

                                    <li className={this.getNavLinkClass("profile")}>
                                        <Link className="nav-link" to="/profile">Profil</Link>
                                    </li>

                                    <li className="nav-item">
                                            <span className="nav-link" onClick={() => this.logout()}><b><i className="fas fa-sign-out-alt"></i> Se déconnecter</b></span>
                                    </li>
                                </ul>
                            </div>   
                        </nav>

                        
                    </div>
                </div> 
            </div>
        )
    }
}

export default withRouter(Sidebar)