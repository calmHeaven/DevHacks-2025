import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [savedExpenses, setSavedExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const username = localStorage.getItem('username');
  const initialBudget = parseFloat(localStorage.getItem('budget')) || 0;

  useEffect(() => {
    setTotalBudget(initialBudget);
    setRemaining(initialBudget);
  }, [initialBudget]);

  useEffect(() => {
    const totalSpent = savedExpenses.reduce((acc, expense) => acc + (parseFloat(expense.amount) || 0), 0);
    setSpent(totalSpent);
    setRemaining(totalBudget - totalSpent);
  }, [savedExpenses, totalBudget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { name: expenseName, amount: expenseAmount, date: expenseDate };
    const updatedExpenses = [...savedExpenses, newExpense];
    setSavedExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDate('');
  };

  const history = useNavigate();

  return (
    <div style={{ fontFamily: 'Comic Sans MS', padding: '20px', background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)', minHeight: '100vh' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#ff6f61',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        fontSize: '36px',
        fontWeight: 'bold'
      }}>
        <div>BudgetFriendly 🦖</div>
      </header>

      {/* Welcome Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        color: '#3b5d5c',
        fontSize: '20px',
        fontWeight: '500',
      }}>
        <div>We have missed you dearly!</div>
      </div>

      {/* Budget Overview Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '30px',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div>Total Budget</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalBudget.toFixed(2)}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>Spent</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6f61' }}>${spent.toFixed(2)}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div>Remaining</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>${remaining.toFixed(2)}</div>
        </div>
      </div>

      {/* Expense Input Form */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Expense Name" 
            value={expenseName} 
            onChange={(e) => setExpenseName(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }}
          />
          <input 
            type="number" 
            placeholder="Amount" 
            value={expenseAmount} 
            onChange={(e) => setExpenseAmount(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }}
          />
          <input 
            type="date" 
            value={expenseDate} 
            onChange={(e) => setExpenseDate(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }}
          />
          <button type="submit" 
          style={{ padding: '10px', margin: '5px', borderRadius: '5px', cursor: 'pointer' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}>
            Submit ✅
          </button>
        </form>
      </div>

      {/* Expense List Table */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <table 
          border="1" 
          style={{
            background: '#444', 
            color: '#fff', 
            padding: '10px', 
            width: '80%', 
            textAlign: 'left',
            borderRadius: '8px',
            marginBottom: '30px',
          }}
        >
          <caption style={{ fontSize: '16px', marginBottom: '10px' }}>Expense List</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {savedExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>${expense.amount}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;
