import React, { useState } from "react";

function Expense({ addExpense }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const handleSubmit = () => {
    if (expenseName && expenseAmount && expenseDate) {
      const newExpense = {
        id: Date.now(),  // Unique ID based on timestamp
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
      };
      addExpense(newExpense);  // Send the new expense data to the parent component
      setExpenseName("");  // Reset input fields
      setExpenseAmount("");
      setExpenseDate("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Press Start 2P, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "350px",
        backgroundColor: "#228B22",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}>
        <div style={{
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <label style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>Expense Name:</label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Enter expense name"
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "250px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              textAlign: "center",
              backgroundColor: "#333",
              color: "#fff",
            }}
          />
        </div>

        <div style={{
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <label style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>Expense Amount:</label>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Enter amount"
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "250px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              textAlign: "center",
              backgroundColor: "#333",
              color: "#fff",
            }}
          />
        </div>

        <div style={{
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <label style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>Date (when the expense occurred):</label>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "250px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              textAlign: "center",
              backgroundColor: "#333",
              color: "#fff",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFD700",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "250px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Expense;
