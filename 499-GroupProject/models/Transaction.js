// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bankAccount: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
