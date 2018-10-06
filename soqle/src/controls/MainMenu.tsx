import * as React from 'react'

import { Link } from "react-router-dom";

type BasicProps = {} & {}

const MainMenu: React.SFC<BasicProps> = () => 
    (<nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="my-important-menu" >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
        </a>
        </div>
        <div className="navbar-menu" id="my-important-menu">
        <div className="navbar-end">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/Explorer">Explorer</Link>
            <Link className="navbar-item" to="/Datasources">Datasources</Link>
        </div>
        </div>
    </nav>)

export default MainMenu