"use client";

import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../lib/ChatContext';
import Message from '../lib/messages';
import { useRouter } from 'next/router';

export default function Home() {
    const { dataChannel, peerName, instanceName } = useContext(ChatContext);
    const [messages, setMessages] = useState<Message[]>([])
    const [messageToSend, setMessageToSend] = useState<string>("");

    const router = useRouter();

    useEffect(() => {

        console.log(dataChannel)
        if (dataChannel) {
            console.log(dataChannel)
            dataChannel.onmessage = (msg) => {
                let message: Message = {
                    sender: peerName,
                    content: msg.data
                }
                setMessages([...messages, message])
            }
        }
        else {
            router.push("/")
        }
    }, [dataChannel]);

    const sendMessage = () => {
        dataChannel?.send(messageToSend);
        setMessages([...messages, {sender: instanceName, content: messageToSend}])
    }

    return (
        <div>
            <input type='text' placeholder='message' value={messageToSend} onChange={(v) => {setMessageToSend(v.currentTarget.value)}}></input><button onClick={sendMessage}>Send!</button>
            <ul>
                {messages.map((value, index) => {

                    return (
                        <li key={index}>
                            {value.sender}: {value.content}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}