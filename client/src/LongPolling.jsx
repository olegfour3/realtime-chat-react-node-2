import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPolling = () => {

        const [messages, setMessages] = useState([]);
        const [value, setValue] = useState('');

        useEffect(() => {
            subscribe()
        }, [])

        const subscribe = async () => {
            try{
                const data = await axios.get('http://localhost:5001/getMessages')
                setMessages(prev => [data, ...prev])
                await subscribe()
            }catch (e) {
                setTimeout(() => {
                    subscribe()
                }, 500)
            }
        }

        const sendMessage = async () => {
            await axios.post('http://localhost:5001/newMessage', {
                message: value,
                id: Date.now()
            })
        }

        return (
            <div className="center">
                <div>
                    <div className="form">
                        <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                        <button onClick={sendMessage}>Отправить</button>
                    </div>
                    <div className="messages">
                        {messages.map(mess =>

                            <div className="message" key={mess.data.id}>
                               {mess.data.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

};

export default LongPolling;