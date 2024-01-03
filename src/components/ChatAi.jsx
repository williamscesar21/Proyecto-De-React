import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck } from "react-icons/fa";


const ChatAI = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '7398806a04msh70e100434bba43ap1bf760jsn070fe9d73c5d',
          'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
        },
        data: {
          query: query
        }
      };

      const response = await axios.request(options);
      setResponse(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h2>Chat W</h2>
      </div>
      <div className="chat-box">
        
        <div className="response-container">
          <strong>Respuesta:</strong> {response}
        </div>
        <div className="input-container">
          <input
            className='input'
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pregunta algo"
          />
          <button className='butAI' onClick={handleAsk}><FaCheck/></button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
