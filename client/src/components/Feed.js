import React, { useContext, useEffect, useState } from 'react';
import PostService from '../services/postService';
import { AuthContext } from '../context/authContext';
import defaultProfPic from '../images/facebook-default-prof-pic.png';

const Feed = () => {

    // const { showOnFeed, setShowOnFeed } = useContext(AuthContext);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        PostService.getAllFriendPosts().then(data => {
            // console.log(data)
            let arrToSort = []
            
            // array.sort(function(a,b){
            //     // Turn your strings into dates, and then subtract them
            //     // to get a value that is either negative, positive, or zero.
            //     return new Date(b.date) - new Date(a.date);
            //   });
              
            for (let i = 0; i < data.length; i++) {
                arrToSort = [...arrToSort, ...data[i].posts];
            }
            arrToSort.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            console.log(arrToSort);
            setPosts(arrToSort);
        })
        
    }, []);

    return (
        <div>
            { posts.length === 0 ? <h4>Refresh the page</h4> : posts.map(({ _id, likes, postedBy, body, title, shares, comments, date }) => (
                <div className="card row card-light p-4 mb-3" key={_id} >
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex align-items-center">
                        <div style={{width: "30px", height: "30px"}} className="mr-3">
                        <img src={defaultProfPic} alt="profile pic" style={{width: "100%", borderRadius: "50%"}} />
                        </div>
                        <div>
                        <small className="text-muted">Name</small>
                        <h4>{postedBy}</h4>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <small className="text-muted">{date}</small>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <h4>{title}</h4>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <p>{body}</p>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                        <div>Likes: {likes}</div>
                        <div>Shares: {shares}</div>
                        <div>Comments: {comments.length}</div>
                    </div>
                </div>
            )) }
                
        </div>
    )
}

export default Feed
