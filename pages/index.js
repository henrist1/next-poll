import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';


function HomePage() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('userEmail');
    // Update state
    setEmail('');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {email} <button onClick={handleLogout}>Logout</button></p>
          <Link legacyBehavior href="/create-poll"><a>Create a Poll</a></Link>
          <br />
          <Link legacyBehavior href="/answer-poll"><a>Answer a Poll</a></Link>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link legacyBehavior href="/register"><a>Register</a></Link>
          <br />
          <Link legacyBehavior href="/login"><a>Login</a></Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
