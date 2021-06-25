import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from 'emerald-ui/lib/Icon';

import routePath from "../../../routers/routePath";

import logo from "../../../assets/icon-cebroker-white.c50979f1.svg";
import './styles.css'

const Navbar = () => {
    return (
        <>
            <div className="app-navbar-img">
                <img src={logo} alt='CE Broker' width='130' />
                <span className="app-navbar-title"> <strong>Automation</strong> </span>
            </div>
            <nav className="app-vertical-menu">
                <span>

                    <NavLink activeClassName="app-active"
                        exact
                        to={routePath.reports}
                        className="app-navbar-option"
                    >
                        <Icon name="poll" className='app-navbar-icon' />
                        <strong className="app-navbar-subtitle">Reports</strong>
                    </NavLink>
                </span>
                <span>
                    <NavLink
                        activeClassName="app-active"
                        exact
                        to={routePath.manipulation}
                        className="app-navbar-option"
                    >
                        <Icon name="mode_edit" className='app-navbar-icon' />
                        <strong className="app-navbar-subtitle">Manipulations</strong>
                    </NavLink>
                </span>
            </nav>
        </>
    )
}

export default Navbar;
