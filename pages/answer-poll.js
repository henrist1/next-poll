import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';


function AnswerPoll() {
  const [polls, setPolls] = useState([]);
  const [selectedPollId, setSelectedPollId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchPolls() {
      try {
        const response = await axios.get('/api/polls');
        setPolls(response.data);
      } catch (error) {
        setMessage('Failed to fetch polls.');
      }
    }

    fetchPolls();
  }, []);

  async function handleAnswerPoll() {
    try {
      const response = await axios.post('/api/answers', { 
        userId: localStorage.getItem('userEmail'), 
        pollId: selectedPollId,
        selectedOption 
      });
      setMessage(`Answered with ID: ${response.data.answerId}`);
    } catch (error) {
      setMessage('Failed to answer poll.');
    }
  }

  return (
    <div>
      <select 
        value={selectedPollId} 
        onChange={(e) => setSelectedPollId(e.target.value)}
      >
        <option value="" disabled>Select a poll</option>
        {polls.map(poll => (
          <option key={poll.pollId} value={poll.pollId}>{poll.question}</option>
        ))}
      </select>
      {selectedPollId && (
        <div>
          {polls.find(p => p.pollId === selectedPollId).options.map(option => (
            <div key={option}>
              <input 
                type="radio" 
                name="pollOption" 
                value={option} 
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {option}
            </div>
          ))}
          <button onClick={handleAnswerPoll}>Answer</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default AnswerPoll;
