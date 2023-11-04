import { useState } from 'react';
import axios from 'axios';
import React from 'react';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // Start with two options
  const [message, setMessage] = useState('');

  async function handleCreatePoll() {
    try {
      const response = await axios.post('/api/polls', { question, options });
      setMessage(`Poll created with ID: ${response.data.pollId}`);
    } catch (error) {
      setMessage('Failed to create poll.');
    }
  }

  function handleOptionChange(index, value) {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  return (
    <div>
      <input 
        type="text" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        placeholder="Poll question" 
      />
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="text" 
            value={option} 
            onChange={(e) => handleOptionChange(index, e.target.value)} 
            placeholder={`Option ${index + 1}`} 
          />
        </div>
      ))}
      <button onClick={() => setOptions([...options, ''])}>Add Option</button>
      <button onClick={handleCreatePoll}>Create Poll</button>
      <p>{message}</p>
    </div>
  );
}

export default CreatePoll;
