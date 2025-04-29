import React from "react";
import "./TransactionList.css";  // import the styles

export default function TransactionList({ transactions, fetchTransactions }) {
  if (transactions.length === 0)
    return <p className="no-data">No transactions yet.</p>;

  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Amount (₹)</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={tx._id}>
              <td className="amount">₹{tx.amount.toFixed(2)}</td>
              <td>{tx.description}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-button delete"
                  onClick={async () => {
                    await fetch(
                      `http://localhost:5000/api/transactions/${tx._id}`,
                      { method: "DELETE" }
                    );
                    fetchTransactions();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
