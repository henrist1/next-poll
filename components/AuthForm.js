import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function AuthForm({ mode }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleSubmit() {
    try {
      // Include an action field in the request body
      const action = mode; // The mode prop itself can be 'login' or 'register'
      const response = await axios.post('/api/users', { email, action });
      if (response.status === 200) {
        localStorage.setItem('userEmail', email);
        router.push('/');
      } else {
        setMessage(response.data.error || `${mode} failed for unknown reasons.`);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || `${mode} failed due to a network or server error.`);
    }
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={`Enter your email to ${mode}`}
      />
      <button onClick={handleSubmit}>{mode === 'login' ? 'Login' : 'Register'}</button>
      {message && <p>Error: {message}</p>}
    </div>
  );
}

export default AuthForm;
