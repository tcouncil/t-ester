import React, { useState, useEffect, useRef } from 'react';
import './Chatbox.css';

const Chatbox = ({ isLoggedIn, user }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [alias, setAlias] = useState('');
    const messagesEndRef = useRef(null);
    const [aliasEntered, setAliasEntered] = useState(false); // New state

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isLoggedIn && user) {
            setAlias(user.username);
            setAliasEntered(true); // Treat logged-in users as having entered an alias
        }
    }, [isLoggedIn, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAliasSubmit = () => {
        if (alias.trim() === '') {
            return; // Prevent submitting empty alias
        }
        setAliasEntered(true);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const currentAlias = isLoggedIn ? user.username : alias.trim();
        setMessages([...messages, { alias: currentAlias, message: newMessage.trim() }]);
        setNewMessage('');
    };

    if (!isLoggedIn && !aliasEntered) {
        return (
            <div>
                <h4>Chatbox</h4>

                <div className="chatbox-container">
                    <div className="message-list">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">
                                <span className="alias">{msg.alias}: </span>
                                {msg.message}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            placeholder="Enter your alias"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAliasSubmit();
                                }
                            }}
                        />
                        <button onClick={handleAliasSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h4>Chatbox</h4>
            <div className="chatbox-container">
                <div className="message-list">
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            <span className="alias">{msg.alias}: </span>
                            {msg.message}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;