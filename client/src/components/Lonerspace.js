import React, { useEffect, useRef, useState } from 'react';
import FriendService from '../services/friendService';
import defaultProfPic from '../images/facebook-default-prof-pic.png';

const Lonerspace = () => {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [err, setErr] = useState(false);
    const userRef = useRef();

    useEffect(() => {
        FriendService.getAllUsers().then(data => {
            console.log(data)
            setUsers(data);
        })
    }, []);

    const sendRequest = e => {
        e.preventDefault();
        FriendService.sendFriendRequest(userRef.current.id).then(data => {

            const { msgBody, msgErr } = data;
            if (msgErr) {
                setErr(false);
            } else {
                setErr(false);
            }
            setMessage(msgBody);
        })
        // console.log(userRef.current.id);
    }

    return (
        <div className="container my-5">
            <div className={(message && err) ? "bg bg-danger my-2 text-center" : "bg bg-primary my-2 text-center"}><small className="text-muted">{message ? message : "I'm too lazy to make a component that slides down when there's message... so this is like a counter"}</small></div>
            {users.map(({ username, posts, friends, id }) => (
                <div className="card card-primary row p-3" key={id} id={id} ref={userRef}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex align-items-center">
                        <div style={{width: "30px", height: "30px"}} className="mr-3">
                        <img src={defaultProfPic} alt="profile pic" style={{width: "100%", borderRadius: "50%"}} />
                        </div>
                        <div>
                        <small className="text-muted">Name</small>
                        <h4>{username}</h4>
                        </div>
                    </div>
                    <div className="d-flex my-3" style={{justifyContent: "space-around"}}>
                        <button type="button" className="btn btn-dark" style={{width: "40%"}} onClick={sendRequest}>Send Friend Request</button>
                        <button type="button" className="btn btn-outline-warning" style={{width: "40%"}}>Stalk this User</button>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">Friends: {friends.length}</small>
                        <small className="text-muted">Posts: {posts.length}</small>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Lonerspace
