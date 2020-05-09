import React, { useContext } from 'react';
import {NavLink, useHistory, BrowserRouter as Router} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.logout();
    }

    return(
        <Router>
            <nav>
                <div className="nav-wrapper">
                <a href="/" className="brand-logo">Давид приветос</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/links'>Create</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Logout</a></li>
                </ul>
                </div>
            </nav>
        </Router>
    )
}