import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

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
        Welcome to BudgetFriendly! <br /> Savings Start Here
      </h2>

      <div
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
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: '10px 20px',
            backgroundColor: '#8A2BE2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            width: '100%',
            marginBottom: '10px',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#7a1bc0')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#8A2BE2')}
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4B0082',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            width: '100%',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#3a0070')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4B0082')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default HomePage;
