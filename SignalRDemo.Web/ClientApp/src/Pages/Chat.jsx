import React, { useEffect, useState, useRef } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";

const Chat = () => {

    const [text, setText] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const connectionRef = useRef();

    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/test").build();
            await connection.start();
            connection.invoke('newUser');
            connectionRef.current = connection;

            connection.on('allMessages', allMessages => {
                setAllMessages(allMessages)
            })

            connection.on('newChatReceived', obj => {
                setAllMessages(allMessages => [...allMessages, obj]);
            })
        }

        

        connectToHub();

    }, []);


    const onSendMessageClick = () => {
        connectionRef.current.invoke('newChatMessage', { message: text });
        setText('');
    }

    return (
        <div style={{ marginTop: 80 }}>
            <div className='row'>
                <div className='col-md-10'>
                    <input value={text} onChange={e => setText(e.target.value)} type='text' className='form-control form-control-lg' placeholder='Type your message here...' />
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-primary btn-lg w-100' onClick={onSendMessageClick}>Send Message</button>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-8 offset-md-2 mt-3'>
                    <ul className="list-group">
                        {allMessages.map((chatMessage, i) => {
                            return <li key={i} className="list-group-item">
                                <h2>
                                    {chatMessage.message}
                                </h2></li>
                        })}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Chat;