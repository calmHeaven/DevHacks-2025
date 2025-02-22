import React, { useState } from "react";

function Expense() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const handleSubmit = () => {
    alert(`Expense Added:\nName: ${expenseName}\nAmount: ${expenseAmount}\nDate: ${expenseDate}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Expense Name:</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Enter expense name"
          style={styles.input}
        />
      </div>

      <div style={styles.inputContainer}>
        <label style={styles.label}>Expense Amount:</label>
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="Enter amount"
          style={styles.input}
        />
      </div>

      <div style={styles.inputContainer}>
        <label style={styles.label}>Date:</label>
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={handleSubmit} style={styles.button}>Submit</button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  inputContainer: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default Expense;
