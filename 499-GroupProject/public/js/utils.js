// services/transactionService.js
const Transaction = require('../../models/Transaction');

async function linkBankAccount(bankAccount) {
    const numTransactions = Math.floor(Math.random() * 20) + 1; // Random between 1 and 20
    const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping'];
    const transactions = [];

    for (let i = 0; i < numTransactions; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const transaction = new Transaction({
            bankAccount: bankAccount,
            description: `Transaction ${i + 1}`,
            date: new Date(new Date() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
            amount: parseFloat((Math.random() * 2000 - 1000).toFixed(2)),
            category: category
        });

        transactions.push(transaction);
    }

    await Transaction.insertMany(transactions); // Save all transactions to the database
}

module.exports = { linkBankAccount };

