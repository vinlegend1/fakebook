export default {
    getAllMessages: () => {
        return fetch('/api/message/').then(res => res.json()).then(data =>  data);
    },
    sendNewMessage: (username, message) => {
        return fetch(`/api/message/new/${username}`, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    },
    deleteMessage: () => console.log("still in working progress...")
}