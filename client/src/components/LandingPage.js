import React, { useState, useRef, useEffect } from 'react';
import facebookHomeSay from '../images/facebook-say.png';
import LogInForm from './LogInForm';
import AuthService from '../services/authService';
import { withRouter } from 'react-router-dom';

const LandingPage = props => {

    const [user, setUser] = useState({ username: '', password: '' });
    const [msgErr, setMsgErr] = useState('');
    const [message, setMessage] = useState('');

    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const resetForm = () => {
        setUser({ username: "", password: "" })
    }
    
    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            // console.log(data);
            const { msgErr, msgBody } = data;
            // console.log(msgBody)
            setMsgErr(msgErr)
            setMessage(msgBody);
            resetForm();
            if (!msgErr) {
                timerID = setTimeout(() => {
                    props.history.push('/')
                }, 2000);
            }
        })
    }

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <>
        <LogInForm props={props} />
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <img src={facebookHomeSay} alt="facebook home saying" className="my-3" style={{width: "100%"}} />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <form onSubmit={onSubmit}>
                    <div className="my-3">
                        <h1 className="display-4 lead font-weight-bold">Create An Account</h1>
                        <p>It's free and always will be</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input type="text" name="username" className="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username" onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">Your username should be unique, or else</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default withRouter(LandingPage)
