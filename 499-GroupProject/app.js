// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const User = require('./models/User');

// Initialize Express app
const app = express();

// Initialize Global variable
const g_walletBalance = 1000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes:
// Redirect to login page
app.get('/', (req, res) => {
  res.redirect('/login-page');
});

// Render login page
// We do need "message"
app.get('/login-page', (req, res) => {
  res.render('login-page', { message: '' });
});

// Render signup page
app.get('/signup-page', (req, res) => {
  res.render('signup-page',{message:'', error:''});
});

// Render forget password page
app.get('/forget-pass-page', (req, res) => {
  res.render('forget-pass-page');
});

// Render home page
app.get('/home-page', (req, res) => { 
  res.render('home-page',{g_walletBalance});
});



// Render Planning page
app.get('/PlanningAndAdv-page', (req, res) => { 
  res.render('PlanningAndAdv-page',{g_walletBalance});
});

// Render deposit page
// We do need "message"
app.get('/deposit-page', (req, res) => {
  res.render('deposit-page', { message: '', g_walletBalance});
});

// Render withdraw page
app.get('/withdraw-page', (req, res) => {
  res.render('withdraw-page', { g_walletBalance });
});

// Render investments management page
app.get('/invest-options-page', (req, res) => {
  res.render('invest-options-page',{g_walletBalance});
});

// Render investing page
app.get('/InvestingPage', (req, res) => {
  res.render('InvestingPage',{g_walletBalance});
});

//Render BankLinkPage
app.get('/bank-link-page', (req, res) => {
  res.render('bank-link-page');
});




// Render Financial Planning Page
app.get('/finance-plan-page', (req, res) => { 
  res.render('finance-plan-page',{g_walletBalance});
});

// Render investments page
app.get('/my-invests-page', (req, res) => {
  res.render('my-invests-page', {g_walletBalance});
});

// Test the open banking functionality

// Generate mock transaction data
function generateTransactions(numTransactions) {
    const transactions = [];
    for (let i = 0; i < numTransactions; i++) {
        const transaction = {
            date: new Date(new Date() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
            description: `Transaction ${i}`,
            amount: (Math.random() * 2000 - 1000).toFixed(2)
        };
        transactions.push(transaction);
    }
    return transactions;
}

// Generate mock account information
function generateAccountInfo() {
    return {
        account_number: '123456789',
        iban: 'GB29 NWBK 6016 1331 9268 19',
        balance: (Math.random() * 9000 + 1000).toFixed(2)
    };
}

app.get('/analytics-page', (req, res) => {
  const transactions = generateTransactions(10);
  const totalBalance = calculateTotalBalance(transactions); // Function to calculate total balance
  const numAccounts = calculateNumAccounts(); // Function to calculate number of accounts

  res.render('analytics-page', { transactions: transactions, totalBalance: totalBalance, numAccounts: numAccounts });
});
// Calculate total balance from transactions
function calculateTotalBalance(transactions) {
  let total = 0;
  transactions.forEach(transaction => {
      total += parseFloat(transaction.amount);
  });
  return total.toFixed(2); // Return total balance rounded to 2 decimal places
}

// Calculate number of accounts
function calculateNumAccounts() {
  // In this example, let's say we have 5 accounts
  return 5;
}

// app.get('/BanksPage', (req, res) => {
//   const transactions = generateTransactions(10);
//   res.render('BanksPage', { transactions: transactions });
// });

// app.get('/account', (req, res) => {
//     const accountInfo = generateAccountInfo();
//     res.json(accountInfo);
// });
// >>>>>>>> Here ends the test <<<<<<<<

//Render Option page
app.get('/options-page', (req, res) => {
  res.render('options-page');
});

// Validation:
// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      res.redirect('/home-page');
    } else {
      res.render('login-page', { message: 'Wrong Username or Password' });
    }
  });

// Handle signup
app.post('/signup/v1/', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({username: username, email: email, password:password});
  
  newUser.save()
    .then(result => {
      res.render('signup-page',{message:'User added successfully', error:''});
    })
    .catch(error => {
      console.log(`Could not add user: ${error}`);
      res.render('signup-page',{message:'', error:'Could not add user, please try again later'});
    });
});

app.post('/forgetpass/v1', (req, res) => {
  res.redirect('/login-page')
});


app.post('/deposit-page', (req, res) => {
  const { cardNumber, cardHolder, expDate, cvv } = req.body; // Extract card details from the request body

  // Validate card details
  const card = cards.find(c =>
    c.cardNumber === cardNumber &&
    c.cardHolder === cardHolder &&
    c.expDate === expDate &&
    c.cvv === cvv
  );

  if (card) {
    // Card details are valid, proceed with deposit logic
    // For example, save the deposit amount to the user's account
    // and then redirect to the success page:
    // ...
    // Your deposit logic here
    // ...
    res.redirect('/home-page'); // Redirect to the success page (adjust the route as needed)
  } else {
    res.render('deposit-page', { message: 'Invalid card details', g_walletBalance}); // Invalid card details, render the DepositPage with an error message
  }
  res.redirect('/home-page');
});

// Dummy data
// Dummy user data for testing
const users = [
  { username: 'user1', password: 'pass1', email: 'user1@hotmail.com' },
  { username: 'user2', password: 'pass2', email: 'user2@hotmail.com' },
];

// Dummy card data for testing
const cards = [
  { cardNumber: '1234567890123456', cardHolder: 'Mohammed M', expirationDate: '12/24', cvv: '123' },
  { cardNumber: '9876 5432 1098 7654', cardHolder: 'Faleh F', expirationDate: '06/23', cvv: '456' },
];

// Handle withdrawPage. 
//Only make it to check the wallet balance + add the IBAN for instance to withdraw
app.post('/withdraw-page', (req, res) => {
    res.redirect('/home-page'); // If the card is not expired, redirect to the HomePage 
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('error-page');
});

// Start the server
mongoose.connect(process.env.MONGO_URI)
  .then(result => {
    console.log(`Successfully connected to database server..`);
    app.listen(process.env.PORT, () => {
      console.log(`Web server listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  })