const express = require("express");

const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://ghoshjeet04:nmNUDzQ0QmcwKFa1@cluster0.t6j4dxs.mongodb.net/TransactionTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes
app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
});

app.post("/api/transactions", async (req, res) => {
  const { amount, description, date } = req.body;
  const newTransaction = await Transaction.create({ amount, description, date });
  res.json(newTransaction);
});

app.delete("/api/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
