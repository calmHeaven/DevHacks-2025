import React, { useState, useEffect } from 'react';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [purposeAmount, setPurposeAmount] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const savedPurpose = localStorage.getItem('purpose');
    if (savedPurpose) {
      setPurpose(savedPurpose);
    }
    const savedAmount = localStorage.getItem('amount');
    if (savedAmount) {
      setPurposeAmount(Number(savedAmount));
    }
    const savedBudget = localStorage.getItem('budget');
    if (savedBudget) {
      setTotalBudget(Number(savedBudget));
    }
    const savedDeadline = localStorage.getItem('deadline');
    if (savedDeadline) {
      setDeadline(savedDeadline);
    }
  }, []);

  useEffect(() => {
    const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setTotalSpent(totalExpenses);

    /* if (totalExpenses >= purposeAmount) {
      alert("Warning: Your expenses have reached or exceeded your goal amount!");
    }

    if (totalExpenses >= totalBudget / 2) {
      alert("Alert, you are halfway through your budget, spend wisely");
    } */
  }, [expenses, purposeAmount, totalBudget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* if (expenseName.toLowerCase() === purpose.toLowerCase()) {
      alert("Kudos! You achieved your goal");
    } */
    const newExpense = { name: expenseName, amount: expenseAmount, date: expenseDate };
    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDate('');
  };

  return (
    <div 
      role="main" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#228B22', // Forest green
        fontFamily: 'Press Start 2P, sans-serif',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <h1>🦖 {purpose}</h1>
      <p>Total Budget: ${totalBudget} | Goal Amount: ${purposeAmount} | Total Spent: ${totalSpent} | Deadline: {deadline}</p>
      
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Expense Name" 
          value={expenseName} 
          onChange={(e) => setExpenseName(e.target.value)} 
          required 
          style={{ padding: '10px', margin: '5px', borderRadius: '5px' }}
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={expenseAmount} 
          onChange={(e) => setExpenseAmount(e.target.value)} 
          required 
          style={{ padding: '10px', margin: '5px', borderRadius: '5px' }}
        />
        <input 
          type="date" 
          value={expenseDate} 
          onChange={(e) => setExpenseDate(e.target.value)} 
          required 
          style={{ padding: '10px', margin: '5px', borderRadius: '5px' }}
        />
        <button type="submit" style={{ padding: '10px', margin: '5px', borderRadius: '5px', cursor: 'pointer' }}>
          Submit ✅
        </button>
      </form>

      <table border="1" style={{ marginTop: '20px', background: '#444', color: '#fff', padding: '10px', width: '80%', textAlign: 'left' }}>
        <caption style={{ fontSize: '16px', marginBottom: '10px' }}>Expense List</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>${expense.amount}</td>
              <td title="When did you make this purchase?">{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensePage;
