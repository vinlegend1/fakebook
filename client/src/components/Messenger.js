import React, { useEffect, useState } from 'react'
import MessageService from '../services/messageService';

const Messenger = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        MessageService.getAllMessages().then(data => {
            setMessages(data);
        })
    }, []);
    return (
        <div>
            {messages.map(message => <div>{message}</div>)}
        </div>
    )
}

export default Messenger
