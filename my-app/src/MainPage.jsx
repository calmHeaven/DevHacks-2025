import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Expense from './Expense';
import Popup from './Popup';

function MainPage() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  
  const username = localStorage.getItem('username');
  const initialBudget = parseFloat(localStorage.getItem('budget')) || 0;

  const messages = ["Goal Reached!", "Almost There!", "Budget Exceeded!", "Halfway There!", "Spending Spike!"];

  useEffect(() => {
    setTotalBudget(initialBudget);
    setRemaining(initialBudget);
  }, [initialBudget]);

  useEffect(() => {
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setSpent(totalSpent);
    setRemaining(totalBudget - totalSpent);
  }, [expenses, totalBudget]);

  const openExpensesModal = () => setIsModalOpen(true);
  const closeExpensesModal = () => setIsModalOpen(false);

  const history = useNavigate();
  const openExpensesPage = () => history.push('/expenses');
  const showRandomPopup = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPopupMessage(randomMessage);
    setPopupVisible(true);
  };
  const closePopup = () => setPopupVisible(false);

  const progress = (spent / totalBudget) * 100;

  const handleDeleteExpense = (expenseName) => {
    const updatedExpenses = expenses.filter(exp => exp.name !== expenseName);
    setExpenses(updatedExpenses);
  };

  const handleUpdateExpense = (expenseName, updatedExpense) => {
    const updatedExpenses = expenses.map(exp => exp.name === expenseName ? updatedExpense : exp);
    setExpenses(updatedExpenses);
  };

  // Update expenses list with the new expense
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div style={{ fontFamily: 'Comic Sans MS', padding: '10px', backgroundColor: '#c2f7f0', height: '100vh', overflow: 'hidden' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#6c9c9f', borderBottom: '2px solid #3b5d5c' }}>
        <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#f7ffff' }}>BudgetFriendly 🦖</div>
        <button onClick={showRandomPopup} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>Add New Plan</button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div>Hello, {username}!</div>
          <div>Total Budget: ${totalBudget}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div>Spent: ${spent}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div>Remaining</div>
          <div>{remaining}</div>
        </div>
        <button onClick={openExpensesModal} style={{ padding: '10px 15px', backgroundColor: '#f28d42', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>Add Expenses</button>
      </div>

      <div>
        <div>Saving Progress</div>
        <div style={{ width: '100%', height: '20px', backgroundColor: '#f1f1f1', borderRadius: '15px', marginTop: '10px' }}>
          <div style={{ height: '100%', backgroundColor: '#f28d42', borderRadius: '15px', width: `${progress}%` }} />
        </div>
      </div>

      <div>
        <h2>Expenses</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#6c9c9f', color: '#fff' }}>
              <th style={{ padding: '10px', textAlign: 'center' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Amount</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Date</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Category</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} style={{ backgroundColor: '#f1f1f1' }}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.name}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>${expense.amount}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.date}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.category}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button onClick={() => handleUpdateExpense(expense.name, { ...expense, amount: expense.amount + 10 })} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
                  <button onClick={() => handleDeleteExpense(expense.name)} style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopupVisible && <Popup spent={spent} budget={totalBudget} onClose={closePopup} />}

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#a3e2d7', padding: '20px', borderRadius: '15px', width: '300px' }}>
            <Expense addExpense={addExpense} />
            <button onClick={closeExpensesModal} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#f28d42', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
