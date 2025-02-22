import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can later add API calls or validation)
    console.log('Form submitted');
    // Redirect to a different page after submission
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
        padding: '20px',
      }}
    >
      <h2
        style={{
          color: '#4B0082',
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Welcome to Our Budget Tracking App! <br />
        Create an Account to Get Started!
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          width: '300px',
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          style={{
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          style={{
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#8A2BE2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#7a1bc0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#8A2BE2')}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
