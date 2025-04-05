"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [chatHistory, setHistory] = useState([]);
    const [chatbotId, setChatbotId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatHistoryRef = useRef(null);

    // Load chatbot ID from localStorage on component mount
    useEffect(() => {
        const storedId = localStorage.getItem('chatbotId');
        if (storedId) {
            setChatbotId(storedId);
            console.log('Loaded chatbot ID from storage:', storedId);
        }
    }, []);

    // Scroll to bottom of chat history on new message
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // Create a new chatbot
    const createChatbot = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://python-backend-xiup.onrender.com/api/chatbot/create', {});
            console.log('Chatbot created:', res.data);

            // Save chatbot ID to state and localStorage
            const newChatbotId = res.data.chatbot_id;
            setChatbotId(newChatbotId);
            localStorage.setItem('chatbotId', newChatbotId);

            setResponse(`Chatbot created with ID: ${newChatbotId}`);
        } catch (error) {
            console.error('Error creating chatbot:', error);
            setResponse('Error creating chatbot. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Send a message to the chatbot
    const sendMessage = async () => {
        if (!message.trim()) {
            setResponse('Please enter a message');
            return;
        }

        // Check if we have a chatbot ID
        const currentChatbotId = chatbotId || localStorage.getItem('chatbotId');
        if (!currentChatbotId) {
            setResponse('No chatbot available. Creating a new one...');
            await createChatbot();
            return;
        }

        setIsLoading(true);
        try {
            // Add the message to chat history
            const newHistory = [...chatHistory, { role: 'user', content: message }];
            setHistory(newHistory);

            // Use backticks for string interpolation
            const res = await axios.post(`http://127.0.0.1:5000/api/chatbot/${currentChatbotId}/chat`, { message });
            console.log('Response from server:', res.data);

            // Add response to chat history
            const botResponse = res.data.response;
            setHistory([...newHistory, { role: 'bot', content: botResponse }]);
            setResponse(botResponse);

            // Clear the input field
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response && error.response.status === 404) {
                setResponse('Chatbot not found. Creating a new one...');
                await createChatbot();
            } else {
                setResponse('Error communicating with the chatbot. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-4 mt-20">
            <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>

            {/* Chat history */}
            <div ref={chatHistoryRef} className="mb-4 border rounded p-4 max-h-96 overflow-y-auto">
                {chatHistory.length === 0 ? (
                    <p className="text-gray-500">Start a conversation...</p>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div key={index} className={`mb-2 p-2 rounded ${chat.role === 'user' ? 'text-right' : ''}`}>
                            <span className="font-bold">{chat.role === 'user' ? 'You' : 'AI'}:</span> {chat.content}
                        </div>
                    ))
                )}
            </div>

            {/* Input area */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>

            <button
                onClick={createChatbot}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
            >
                {isLoading ? 'Creating...' : 'Create New Chatbot'}
            </button>
        </div>
    );
}

export default Chat;