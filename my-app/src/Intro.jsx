import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Intro = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isGreeting, setIsGreeting] = useState(false);
  const [answers, setAnswers] = useState({
    purpose: localStorage.getItem('purpose') || '',
    amount: localStorage.getItem('amount') || '',
    budget: localStorage.getItem('budget') || '',
    deadline: localStorage.getItem('deadline') || '',
  });
  //const username=localStorage.getItem('username') || ''; // Get username from localStorage
  const questions = [
    `Hey ${username}, why are you saving up?`,
    `Cool, ${username}! How much do you want to save?`,
    `Alright, ${username}! What's your budget for this?`,
    `One last thing, ${username}. When do you want to hit your goal?`,
  ];

  useEffect(() => {
    if (questionIndex > 0) {
      const keys = ["purpose", "amount", "budget", "deadline"];
      localStorage.setItem(keys[questionIndex - 1], answers[keys[questionIndex - 1]]);
    }
  }, [answers, questionIndex]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (questionIndex === 0 && !isGreeting) {
          localStorage.setItem('username', username);
          setIsGreeting(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [username, questionIndex, isGreeting]);

  return (
    <div 
      role="main" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#228B22', // forest green color
        fontFamily: 'Press Start 2P, sans-serif',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
      }}
    >

      {/* Dino & Progress Bar */}
      <div 
        role="progressbar" 
        aria-valuenow={(questionIndex / 4) * 100} 
        aria-valuemin="0" 
        aria-valuemax="100"
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src="https://i.imgur.com/YhMoOES.png" 
          alt="Pixelated dinosaur running" 
          style={{
            width: '50px',
            height: '50px',
            transition: 'transform 0.3s ease-in-out',
            transform: `translateY(${questionIndex > 0 ? '-20px' : '0px'})`
          }} 
        />
        <div 
          style={{
            width: '50%',
            height: '8px',
            background: '#666',
            borderRadius: '5px',
            marginLeft: '10px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div 
            style={{
              height: '100%',
              background: '#00ff00',
              width: `${(questionIndex / 4) * 100}%`,
              transition: 'width 0.5s',
            }}
          ></div>
        </div>
      </div>

      {/* Question Box */}
      <div 
        role="dialog" 
        aria-labelledby="question-box"
        style={{
          background: '#444',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '5px 5px 0px #000',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          animation: 'fadeIn 0.5s ease-in-out',
          color: '#fff',
        }}
      >
        {questionIndex === 0 && !isGreeting && (
          <form onSubmit={(e) => e.preventDefault()} aria-label="User Name Input">
            <h2 id="question-box" style={{ fontSize: '14px' }}>What’s your name?</h2>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
              aria-label="Enter your name"
              style={{
                width: '90%',
                padding: '10px',
                marginTop: '10px',
                borderRadius: '5px',
                border: '2px solid #000',
                fontSize: '12px',
                fontFamily: 'Press Start 2P, sans-serif',
                textAlign: 'center',
                background: '#222',
                color: '#fff',
              }} 
            />
            <p style={{ fontSize: '10px', marginTop: '5px' }}>Press ENTER to continue</p>
          </form>
        )}

        {isGreeting && questionIndex === 0 && (
          <div>
            <h2 style={{ fontSize: '14px' }}>Hey, {username}! Ready to save? 🦖</h2>
            <p style={{ fontSize: '10px' }}>Press ENTER to start</p>
          </div>
        )}

        {questionIndex > 0 && questionIndex <= questions.length && (
          <form onSubmit={(e) => e.preventDefault()} aria-label="User Answer Input">
            <h2 id="question-box" style={{ fontSize: '14px' }}>{questions[questionIndex - 1]}</h2>
            <input 
              type={questionIndex === 3 ? "number" : questionIndex === 4 ? "date" : "text"} 
              value={answers[Object.keys(answers)[questionIndex - 1]]}
              onChange={(e) => setAnswers({ ...answers, [Object.keys(answers)[questionIndex - 1]]: e.target.value })}
              required 
              aria-label="Enter your answer"
              style={{
                width: '90%',
                padding: '10px',
                marginTop: '10px',
                borderRadius: '5px',
                border: '2px solid #000',
                fontSize: '12px',
                fontFamily: 'Press Start 2P, sans-serif',
                textAlign: 'center',
                background: '#222',
                color: '#fff',
              }}
            />
            <p style={{ fontSize: '10px', marginTop: '5px' }}>Press ENTER to continue</p>
          </form>
        )}

        {questionIndex > questions.length && (
          <div>
            <h2 style={{ fontSize: '14px' }}>🎉 Done, {username}! Your plan is set!</h2>
            <button 
              onClick={() => navigate('/mainpage')}
              aria-label="Finish setup"
              style={{
                padding: '10px',
                backgroundColor: '#00ff00',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                fontSize: '12px',
                fontFamily: 'Press Start 2P, sans-serif',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              Finish 🦖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
