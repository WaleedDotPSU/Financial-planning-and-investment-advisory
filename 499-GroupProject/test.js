// Import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const { sendEmail } = require('./public/js/emailService');
const User = require('./models/User');
const Card = require('./models/Card');
const Transaction = require('./models/Transaction');
const fs = require('fs').promises; // Ensure to use promises version of fs
const faker = require('faker');

// Initialize Express app
const app = express();

// Set up and configure app
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize Global variable
const g_walletBalance = 1000;

// Set up OpenAI with API key from environment variable
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Route to display transactions
app.get('/analytics-page', async (req, res) => {
    try {
        const data = await fs.readFile('transactions.json', 'utf8');
        const transactions = JSON.parse(data);
        res.render('analytics-page', { transactions: transactions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading transactions data.');
    }
});

// Route to handle bank account linking and transaction generation
app.post('/link-bank-account', async (req, res) => {
    const bankAccount = req.body.bankAccount;
    try {
        let transactions = await readTransactions(); // Read existing transactions

        // Generate 10 random transactions for the linked bank account
        for (let i = 0; i < 10; i++) {
            const newTransaction = new Transaction({
                bankAccount: bankAccount,
                description: faker.finance.transactionDescription(),
                date: faker.date.recent(),
                amount: faker.finance.amount(),
                category: faker.commerce.productMaterial()
            });
            await newTransaction.save();
            transactions.push(newTransaction); // Append new transactions to the array
        }

        // Write updated transactions to the JSON file
        await fs.writeFile('transactions.json', JSON.stringify(transactions, null, 2));
        console.log('Transactions Updated:', transactions);
        res.redirect('/analytics-page');
    } catch (error) {
        console.error('Error processing transactions:', error);
        res.status(500).send('Error linking bank account and creating transactions');
    }
});


// Helper function to read existing transactions
async function readTransactions() {
    try {
        const data = await fs.readFile('transactions.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If no file exists, start with an empty array
            console.log('No existing transactions. Starting fresh.');
            return [];
        } else {
            // Rethrow the error if it's not due to the file not being found
            throw error;
        }
    }
}


// Additional routes
app.get('/', (req, res) => res.redirect('/login-page'));
app.get('/login-page', (req, res) => res.render('login-page', { message: '' }));
app.get('/place-money-page', (req, res) => res.render('place-money-page'));
app.get('/ai-page', (req, res) => res.render('ai-page', { message: '' }));
app.get('/ai2-page', (req, res) => res.render('ai2-page', { message: '' }));
app.get('/signup-page', (req, res) => res.render('signup-page', { message: '', error: '' }));
app.get('/forget-pass-page', (req, res) => res.render('forget-pass-page', { message: '', error: '' }));
app.get('/home-page', (req, res) => res.render('home-page', { g_walletBalance }));
app.get('/planning-advice-page', (req, res) => res.render('planning-advice-page', { g_walletBalance }));
app.get('/deposit-page', (req, res) => res.render('deposit-page', { message: '', g_walletBalance }));
app.get('/withdraw-page', (req, res) => res.render('withdraw-page', { g_walletBalance }));
app.get('/invest-options-page', (req, res) => res.render('invest-options-page', { g_walletBalance }));
app.get('/InvestingPage', (req, res) => res.render('InvestingPage', { g_walletBalance }));
app.get('/bank-link-page', (req, res) => res.render('bank-link-page'));
app.get('/finance-plan-page', (req, res) => res.render('finance-plan-page', { g_walletBalance }));
app.get('/my-invests-page', (req, res) => res.render('my-invests-page', { g_walletBalance }));
app.get('/options-page', (req, res) => res.render('options-page'));

// Error handling for login, signup, and forget password
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && password === user.password) {
            res.redirect('/home-page');
        } else {
            res.render('login-page', { message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/signup/v1/', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
        res.render('signup-page', { message: 'User added successfully', error: '' });
    } catch (error) {
        console.error(`Could not add user: ${error}`);
        res.render('signup-page', { message: '', error: 'Could not add user, please try again later' });
    }
});

app.post('/forget-pass/v1', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const emailText = `Hey ${user.username}, your password is: ${user.password}. Please consider changing it once you're logged in.`;
            await sendEmail(user.email, 'Your Password Recovery', emailText);
            res.render('forget-pass-page', { message: 'Password sent to your email', error: '' });
        } else {
            res.render('forget-pass-page', { message: '', error: 'User not found' });
        }
    } catch (error) {
        console.error('Error in forget password:', error);
        res.status(500).render('forget-pass-page', { message: '', error: 'Internal server error' });
    }
});

// 404 error handling
app.use((req, res) => res.status(404).render('error-page'));

// Start the server
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Successfully connected to the database.`);
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error) => console.error('Database connection failed:', error));
