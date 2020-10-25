import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import ListOfFriends from './ListOfFriends';
import Feed from './Feed';
import NewPost from './NewPost';

const Home = () => {
    
    const authContext = useContext(AuthContext);
    console.log(authContext.user);
    return (
        <div className="row container-fluid">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <h1>
                    Welcome, {authContext.user.username}
                </h1>
            </div>
            <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12">
                <ListOfFriends />
            </div>
            <div className="col-xl-8 col-lg-9 col-md-12 col-sm-12">
                <NewPost />
                <Feed />
            </div>
        </div>
    )
}

export default Home
