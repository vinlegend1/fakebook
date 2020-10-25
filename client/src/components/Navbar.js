import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/authContext';

const Navbar = props => {

    const authContext = useContext(AuthContext);

    const onClickLogout = e => {
        e.preventDefault();
        authService.logout().then(data => {
            const { success, user } = data;
            if (success) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(false);
                props.history.push('/');
            }
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><span className="fa fa-search"></span></button>
            </form>

            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link to="/home"><a className="nav-link">Home <span className="sr-only">(current)</span></a></Link>
            </li>

            <li className="nav-item">
                <Link to="/messages"><a className="nav-link"><span className="fa fa-comment"></span></a></Link>
            </li>

            <li className="nav-item">
                <button className="btn btn-outline-secondary nav-link" onClick={onClickLogout} >Logout</button>
            </li>
            
            </ul>
            
        </div>
        </nav>
    )
}

export default withRouter(Navbar)
