import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function MainPage() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [showExpenses, setShowExpenses] = useState(false);

  const handleTotalBudgetChange = (e) => setTotalBudget(e.target.value);
  const handleSpentChange = (e) => {
    setSpent(e.target.value);
    setRemaining(totalBudget - e.target.value);
  };

  const history = useHistory();

  const openExpensesPage = () => {
    history.push('/expenses');
  };

  const progress = (spent / totalBudget) * 100;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px' }}>
      <header style={styles.header}>
        <div style={styles.appName}>BudgetFriendly</div>
        <button onClick={openExpensesPage} style={styles.button}>Add Expenses</button>
      </header>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.iconContainer}>
            <div>Total Budget</div>
            <input 
              type="number" 
              value={totalBudget} 
              onChange={handleTotalBudgetChange} 
              placeholder="Enter Budget" 
              style={styles.input}
            />
          </div>
          <div style={styles.iconContainer}>
            <div>Spent</div>
            <input 
              type="number" 
              value={spent} 
              onChange={handleSpentChange} 
              placeholder="Enter Spent" 
              style={styles.input}
            />
          </div>
          <div style={styles.iconContainer}>
            <div>Remaining</div>
            <div>{remaining}</div>
          </div>
        </div>
        <div>
          <div>Saving Progress</div>
          <div style={styles.progressBarContainer}>
            <div 
              style={{ ...styles.progressBar, width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #ccc',
  },
  appName: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  iconContainer: {
    flex: 1,
    textAlign: 'center',
  },
  input: {
    marginTop: '5px',
    padding: '5px',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  progressBarContainer: {
    width: '100%',
    height: '20px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    marginTop: '10px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: '10px',
  }
};

export default MainPage;
