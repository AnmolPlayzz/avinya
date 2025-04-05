'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';
import SingleInput from '@/components/library/Inputs/SingleInput/singleInput';
import Button from '@/components/library/buttons/button';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setHistory] = useState<ChatMessage[]>([]);
  const [chatbotId, setChatbotId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('chatbotId');
    if (storedId) {
      setChatbotId(storedId);
      console.log('Loaded chatbot ID from storage:', storedId);
    }
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const createChatbot = async () => {
    setHistory([]);
    setIsLoading(true);
    try {
      const res = await axios.post('https://python-backend-xiup.onrender.com/api/chatbot/create', {});
      console.log('Chatbot created:', res.data);

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
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      setResponse('Please enter a message');
      return;
    }

    const currentChatbotId = chatbotId || localStorage.getItem('chatbotId');
    if (!currentChatbotId) {
      setResponse('No chatbot available. Creating a new one...');
      await createChatbot();
      return;
    }

    setIsLoading(true);
    try {
      const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: message }];
      setHistory(newHistory);

      const res = await axios.post(
        `https://python-backend-xiup.onrender.com/api/chatbot/${currentChatbotId}/chat`,
        { message }
      );
      console.log('Response from server:', res.data);

      const botResponse = res.data.response;
      setHistory([...newHistory, { role: 'bot', content: botResponse }]);
      setResponse(botResponse);
      setMessage('');
    } catch (error: any) {
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
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NutriBuddy</h1>

      <div ref={chatHistoryRef} className={styles.chatHistory}>
        {chatHistory.length === 0 ? (
          <p style={{ color: '#9ca3af' }}>Start a conversation...</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${chat.role === 'user' ? styles.userMessage : styles.botMessage}`}
            >
              <span className={styles.role}>{chat.role === 'user' ? 'You' : 'AI'}:</span> {chat.content}
            </div>
          ))
        )}
      </div>

      <div className={styles.inputContainer}>
        <SingleInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            holder="Type your message here..."
        />
        <div
        style={{
          padding: "4px",
        }}
        >
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          variant='Primary'
          text='Send'
        />
        </div>
        <div
        style={{
          padding: "4px",
        }}
        >
      <Button
        onClick={createChatbot}
        disabled={isLoading}
        variant='Secondary'
        text='New Chat'
        />
        </div>
      </div>
    </div>
  );
};

export default Chat;
