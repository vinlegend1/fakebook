export default {
    getAllFriends: () => {
        return fetch('/api/friends/').then(res => res.json()).then(data => data);
    },
    getFriendById: id => {
        return fetch(`/api/friends/${id}`).then(res => res.json()).then(data => data);
    },
    sendFriendRequest: id => {
        return fetch(`/api/friends/request?id=${id}`, {
            method: 'PUT'
        }).then(res => res.json()).then(data => data);
    },
    acceptFriendRequest: id => {
        return fetch(`/api/friends/request/accept?id=${id}`, {
            method: 'PUT'
        }).then(res => res.json()).then(data => data);
    },
    getAllUsers: () => {
        return fetch('/api/user/all').then(res => res.json()).then(data => data);
    }
}