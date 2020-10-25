export default {
    getAllFriends: () => {
        return fetch('/api/friends/').then(res => res.json()).then(data => data);
    },
    getFriendById: id => {
        return fetch(`/api/friends/${id}`).then(res => res.json()).then(data => data);
    },
    sendFriendRequest: userToSend => {
        return fetch('//api/friends/request', {
            method: 'POST',
            body: JSON.stringify(userToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    },
    acceptFriendRequest: userToAccept => {
        return fetch('//api/friends/request/accept', {
            method: 'POST',
            body: JSON.stringify(userToAccept),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    }
}