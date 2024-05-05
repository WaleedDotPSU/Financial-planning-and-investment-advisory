// Import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendEmail } = require('./public/js/emailService');
const User = require('./models/User');
const Card = require('./models/Card');

// Initialize Express app
const app = express();

// Initialize Global variable
const g_walletBalance = 1000;

//For Transactions
const Transaction = require('./models/Transaction'); 
const { linkBankAccount } = require('./public/js/utils'); 


// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));

/// Routes ///

// Redirect to login page
app.get('/', (req, res) => {
  res.redirect('/login-page');
});

// Render place money page
app.get('/place-money-page', (req, res) => {
  res.render('place-money-page');
});

// Render login page
app.get('/login-page', (req, res) => {
  res.render('login-page', {message: ''});
});

// Render signup page
app.get('/signup-page', (req, res) => {
  res.render('signup-page', {message: '', error: ''});
});

// Render forget password page
app.get('/forget-pass-page', (req, res) => {
  res.render('forget-pass-page', {message: '',error:''});
});

// Render home page
app.get('/home-page', (req, res) => {
  res.render('home-page', {g_walletBalance});
});

// Render planning and advisory page
app.get('/planning-advice-page', (req, res) => {
  res.render('planning-advice-page', {g_walletBalance});
});

// Render deposit page
app.get('/deposit-page', (req, res) => {
  res.render('deposit-page', {message: '', g_walletBalance});
});

// Render withdraw page
app.get('/withdraw-page', (req, res) => {
  res.render('withdraw-page', {g_walletBalance});
});

// Render investment options page
app.get('/invest-options-page', (req, res) => {
  res.render('invest-options-page', {g_walletBalance});
});

// Render investing page
app.get('/InvestingPage', (req, res) => {
  res.render('InvestingPage', {g_walletBalance});
});

// Render bank linking page
app.get('/bank-link-page', (req, res) => {
  res.render('bank-link-page');
});

// Render financial planning page
app.get('/finance-plan-page', (req, res) => {
  res.render('finance-plan-page', {g_walletBalance});
});

// Render my investments page
app.get('/my-invests-page', (req, res) => {
  res.render('my-invests-page', {g_walletBalance});
});

// Render options page
app.get('/options-page', (req, res) => {
  res.render('options-page');
});

// Handle login
app.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (user) {
      if (password === user.password) {
        return res.redirect('/home-page');
      }
    }

    res.render('login-page', {message: 'Invalid username or password'});

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

// Handle signup
app.post('/signup/v1/', (req, res) => {
  const {username, email, password} = req.body;
  const newUser = new User({username: username, email: email, password: password});

  newUser.save()
    .then((result) => {
      res.render('signup-page', {message: 'User added successfully', error: ''});
    })
    .catch((error) => {
      console.log(`Could not add user: ${error}`);
      res.render('signup-page', {message: '', error: 'Could not add user, please try again later'});
    });
});

// Handle forget password
app.post('/forget-pass/v1', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).render('forget-pass-page', { message: 'Invalid email address',  error: '' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).render('forget-pass-page', { message:'', error: 'User not found' });
    }

    const emailText = `Hey ${user.username},\n\nYour password is: ${user.password}\n\nPlease consider changing it once your logged in.`;

    await sendEmail(user.email, 'Your Password Recovery', emailText);

    res.render('forget-pass-page', { message: 'Password is sent to your email', error: '' });

    console.log('Email sent succesfully')
  } catch (error) {
    console.error('Error in forget password:', error);
    res.status(500).render('forget-pass-page', { message:'', error: 'Internal server error' });
  }
});

// Handle deposit
app.post('/deposit-page', (req, res) => {
  const {cardNumber, cardHolder, expDate, cvv} = req.body; 

  const card = cards.find((c) =>
    c.cardNumber === cardNumber && c.cardHolder === cardHolder &&
    c.expDate === expDate && c.cvv === cvv);

  if (card) {
    res.redirect('/home-page'); 
  } else {
    res.render('deposit-page', {message: 'Invalid card details', g_walletBalance});
  }
  res.redirect('/home-page');
});

// Handle withdraw
app.post('/withdraw-page', (req, res) => {
  res.redirect('/home-page');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('error-page');
});


// Handle withdraw
// app.post('/withdraw-page', (req, res) => {
//   res.redirect('/home-page');
// });

/// Functions ///
// HERE'S EVERYTHING ABOUT THE analytics-page
// Render analytics page
// app.get('/analytics-page', (req, res) => {
//   const transactions = generateTransactions(10);
//   const totalBalance = calculateTotalBalance(transactions);
//   const numAccounts = calculateNumAccounts();

//   res.render('analytics-page', {
//     transactions: transactions,
//     totalBalance: totalBalance,
//     numAccounts: numAccounts,
//   });
// });

// const Transaction = require('./models/Transaction'); 
// const { linkBankAccount } = require('./public/js/utils'); 


app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data

// Route to handle linking a bank account
app.post('/link-bank-account', async (req, res) => {
    const { bankAccount, 'account-holder-name': holderName, 'account-number': accountNumber, iban } = req.body;

    // This function will generate and store transactions
    await linkBankAccount(bankAccount);

    // Redirect to the analytics page after linking bank account
    res.redirect('/analytics-page');
});

// Route to display analytics page
app.get('/analytics-page', async (req, res) => {
    const transactions = await Transaction.find().lean(); // Fetch all transactions from DB
    const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2);
    const numAccounts = new Set(transactions.map(t => t.bankAccount)).size;

    res.render('analytics-page', {
        transactions,
        totalBalance,
        numAccounts,
    });
});


// app.post('/link-bank-account', async (req, res) => {
//     const { bankAccount } = req.body;

//     await linkBankAccount(bankAccount);

//     // Redirect or send a success response
//     res.redirect('/analytics-page');
// });

// app.get('/analytics-page', async (req, res) => {
//     const transactions = await Transaction.find().lean(); // Fetch all transactions
//     const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2);
//     const numAccounts = new Set(transactions.map(t => t.bankAccount)).size;

//     res.render('analytics-page', {
//         transactions,
//         totalBalance,
//         numAccounts,
//     });
// });

// // Render analytics page
// app.get('/analytics-page', (req, res) => {
//   const transactions = generateMockTransactions();
//   const totalBalance = calculateTotalBalance(transactions);
//   const numAccounts = getUniqueBankAccounts(transactions);

//   res.render('analytics-page', {
//       transactions: transactions,
//       totalBalance: totalBalance,
//       numAccounts: numAccounts,
//   });
// });

// Generate mock transaction data
// function generateTransactions(numTransactions) {
//   const transactions = [];

//   for (let i = 0; i < numTransactions; i++) {
//     const transaction = {
//       date: new Date(
//       new Date() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
//       description: `Transaction ${i}`,
//       amount: (Math.random() * 2000 - 1000).toFixed(2),
//     };

//     transactions.push(transaction);
//   }
//   return transactions;
// }

// Generate mock account information
// function generateAccountInfo() {
//   return {
//     account_number: '123456789',
//     iban: 'GB29 NWBK 6016 1331 9268 19',
//     balance: (Math.random() * 9000 + 1000).toFixed(2),
//   };
// }

// // Calculate total balance from transactions
// function calculateTotalBalance(transactions) {
//   let total = 0;
  
//   transactions.forEach((transaction) => {
//     total += parseFloat(transaction.amount);
//   });
//   return total.toFixed(2);
// }

// // Calculate number of accounts
// function calculateNumAccounts() {
//   return 5;
// }

// Start the server
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
      console.log(`Successfully connected to database server..`);
      app.listen(process.env.Port, () => {
        console.log(`Web server listening on port ${process.env.Port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });


