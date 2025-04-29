// src/components/TransactionForm.jsx
import { useState } from "react";
import "./TransactionForm.css";

export default function TransactionForm({ fetchTransactions }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !date) {
      return alert("All fields are required!");
    }
    await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, description, date }),
    });
    setAmount("");
    setDescription("");
    setDate("");
    fetchTransactions();
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        className="form-input"
        type="number"
        placeholder="Amount (e.g. 34.50)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="form-input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="form-input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit" className="form-button">
        Add Transaction
      </button>
    </form>
  );
}
