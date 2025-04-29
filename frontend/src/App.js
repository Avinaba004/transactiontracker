// src/App.js
import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionChart from "./components/TransactionChart";
import TransactionList from "./components/TransactionList";
import logo from "./components/image/logo.png";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:5000/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        💰 My Transaction Tracker
      </header>

      <main className="app-main">
        {/* your existing form, chart, and list */}
        <TransactionForm fetchTransactions={fetchTransactions} />
        <TransactionChart transactions={transactions} />
        <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Avinaba Ghosh. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
