import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('🦖 RAWR! Fill in both fields before stomping forward.');
      return;
    }

    // Here you would replace this logic with a real authentication API call
    // For now, we simply log success or failure
    if (email && password) {
      console.log('Login successful! 🦕');
      navigate('/mainpage');
    } else {
      setError('🚨 Wrong footprint detected! Try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#7FDBFF', // Light blue like the Jurassic sky
        padding: '20px',
      }}
    >
      <h2
        style={{
          color: '#228B22', // Dino green
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center',
          fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fun and playful
        }}
      >
        🦖 Welcome Back, Dino-Tamer! <br /> Log in to Your Jurassic Budget Tracker
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff8dc', // Fossil-like parchment
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
          width: '320px',
          border: '4px solid #8B4513', // Wood-like frame
        }}
      >
        {error && (
          <p
            style={{
              color: 'red',
              fontSize: '14px',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="🦕 Enter your dino email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '10px',
            marginBottom: '15px',
            border: '2px solid #A0522D', // Earthy brown
            borderRadius: '6px',
            width: '100%',
            fontSize: '16px',
            backgroundColor: '#FAF0E6', // Soft beige
          }}
        />
        <input
          type="password"
          placeholder="🦴 Enter your secret dino code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            marginBottom: '20px',
            border: '2px solid #A0522D',
            borderRadius: '6px',
            width: '100%',
            fontSize: '16px',
            backgroundColor: '#FAF0E6',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#228B22', // Dino green
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, transform 0.1s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#006400')} // Darker green on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = '#228B22')}
          onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
        >
          🦖 Stomp In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
