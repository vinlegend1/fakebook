export default {
    getAllFriendPosts: () => {
        return fetch('/api/post/all/friends').then(res => res.json()).then(data => data);
    },
    getPostByUsername: username => {
        return fetch(`/api/post/${username}`).then(res => res.json()).then(data => data);
    },
    postNewPost: post => {
        return fetch('/api/post/new', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    }
}