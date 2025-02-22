import React, { useState } from 'react';

const Intro = () => {
  // State to store answers to the questions
  const [username, setUsername] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0); // Controls which question is displayed
  const [isGreeting, setIsGreeting] = useState(false); // State to track if the greeting is shown

  // CSS styling as inline styles
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: 'Arial, sans-serif',
    },
    questionBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'opacity 1s ease',
      opacity: 1,
    },
    input: {
      padding: '10px',
      marginTop: '10px',
      width: '80%',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#7b5dfa',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      marginTop: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#5e3dc6',
    },
  };

  // Event handler for each question input
  const handleNameSubmit = (event) => {
    event.preventDefault();
    setIsGreeting(true); // Show greeting after name is entered
  };

  const handlePurposeSubmit = (event) => {
    event.preventDefault();
    setQuestionIndex(2); // Go to next question after purpose is submitted
  };

  const handleAmountSubmit = (event) => {
    event.preventDefault();
    setQuestionIndex(3); // Go to next question after amount is submitted
  };

  const handleBudgetSubmit = (event) => {
    event.preventDefault();
    setQuestionIndex(4); // Go to next question after budget is submitted
  };

  const handleDeadlineSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for completing the survey!'); // End the survey after the last question
  };

  return (
    <div style={style.container}>
      <div style={style.questionBox}>
        {/* Show Greeting first after name is submitted */}
        {questionIndex === 0 && !isGreeting && (
          <form onSubmit={handleNameSubmit}>
            <h2>What is your name?</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              style={style.input}
              required
            />
            <button
              type="submit"
              style={style.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = style.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = style.button.backgroundColor)}
            >
              Next
            </button>
          </form>
        )}

        {/* Display Greeting after the name is entered */}
        {isGreeting && (
          <div>
            <h2>Hello, {username}! Nice to meet you.</h2>
            <button
              onClick={() => {
                setIsGreeting(false);
                setQuestionIndex(1); // Proceed to the next question after greeting
              }}
              style={style.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = style.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = style.button.backgroundColor)}
            >
              Continue
            </button>
          </div>
        )}

        {/* Proceed with the rest of the questions after greeting */}
        {questionIndex === 1 && !isGreeting && (
          <form onSubmit={handlePurposeSubmit}>
            <h2>What is the purpose of your savings journey?</h2>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., buying a house, travel, etc."
              style={style.input}
              required
            />
            <button
              type="submit"
              style={style.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = style.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = style.button.backgroundColor)}
            >
              Next
            </button>
          </form>
        )}

        {questionIndex === 2 && (
          <form onSubmit={handleAmountSubmit}>
            <h2>How much do you aim to accumulate?</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter the target amount"
              style={style.input}
              required
            />
            <button
              type="submit"
              style={style.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = style.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = style.button.backgroundColor)}
            >
              Next
            </button>
          </form>
        )}

        {questionIndex === 3 && (
          <form onSubmit={handleBudgetSubmit}>
            <h2>What is your budget for this goal?</h2>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your budget"
              style={style.input}
              required
            />
            <button
              type="submit"
              style={style.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = style.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = style.button.backgroundColor)}
            >
              Next
            </button>
          </form>
        )}

        {questionIndex === 4 && (
          <form onSubmit={handleDeadlineSubmit}>
            <h2>By when would you like to reach your savings target?</h2>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={style.input}
              required
            />
            <button
              type="submit"
              style={style.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = style.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = style.button.backgroundColor)}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Intro;
