import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';
import { AuthContext } from '../context/authContext';
// import { withRouter } from 'react-router-dom';

const LoginForm = ({ props }) => {

    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, msgBody } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/home');
            } else {
                setMessage(msgBody);
            }
        })
    }

    return (
        <nav className="navbar navbar-light bg-primary justify-content-between px-5">
        <Link to="/"><a className="navbar-brand font-weight-bolder text-white">Fakebook</a></Link>
        <form className="form-inline" onSubmit={onSubmit} >
            <input className="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" name="username" onChange={onChange} />
            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" name="password" onChange={onChange} />
            <button className="btn btn-primary my-2 my-sm-0 form-control" type="submit">Log In</button>

        </form>
        </nav>
    )
}

export default LoginForm
