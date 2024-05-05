// LinkBankAccount.js

function linkBankAccount(bankName) {
    const numTransactions = Math.floor(Math.random() * 20) + 1; // Random between 1 and 20
    const transactions = generateTransactions(bankName, numTransactions);

    // Store transactions
    let allTransactions = JSON.parse(localStorage.getItem("allTransactions")) || [];
    allTransactions = allTransactions.concat(transactions);
    localStorage.setItem("allTransactions", JSON.stringify(allTransactions));
}

function generateTransactions(bankName, numTransactions) {
    const transactions = [];
    const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping'];
  
    for (let i = 0; i < numTransactions; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const transaction = {
            date: new Date(new Date() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
            description: `Transaction ${i}`,
            amount: (Math.random() * 2000 - 1000).toFixed(2),
            category: category,
            bank: bankName // Include bank name
        };
  
        transactions.push(transaction);
    }
    return transactions;
}
