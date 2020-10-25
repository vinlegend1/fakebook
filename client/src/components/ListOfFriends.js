import React, { useEffect, useState } from 'react'
import defaultProfPic from '../images/facebook-default-prof-pic.png';
import FriendService from '../services/friendService';

const ListOfFriends = () => {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        FriendService.getAllFriends().then(data => {
            setFriends(data);
        });
    }, [])

    return (
        <div>
            <h5 className="text-muted my-2">Your Friends, (or are they?)</h5>
            <hr />
            {friends.map(friend => (
                <div className="d-flex">
                    <div style={{width: "30px", height: "30px"}} className="mr-3">
                        <img src={defaultProfPic} alt="profile pic" style={{width: "100%", borderRadius: "50%"}} />
                    </div>
                    <h4 key={friend._id}>{friend.username}</h4>
                </div>
            ))}
        </div>
    )
}

export default ListOfFriends
