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
  res.redirect('/LoginPage');
});

// Render login page
// We do need "message"
app.get('/LoginPage', (req, res) => {
  res.render('LoginPage', { message: '' });
});

// Render signup page
app.get('/SignupPage', (req, res) => {
  res.render('SignupPage',{message:'', error:''});
});

// Render forget password page
app.get('/ForgetPassPage', (req, res) => {
  res.render('ForgetPassPage');
});

// Render home page
app.get('/HomePage', (req, res) => { 
  res.render('HomePage',{g_walletBalance});
});

// Render deposit page
// We do need "message"
app.get('/DepositPage', (req, res) => {
  res.render('DepositPage', { message: '', g_walletBalance});
});

// Render withdraw page
app.get('/WithdrawPage', (req, res) => {
  res.render('withdrawPage', { g_walletBalance });
});

// Render investments management page
app.get('/InvestmentsManagementPage', (req, res) => {
  res.render('InvestmentsManagementPage',{g_walletBalance});
});

// Render investing page
app.get('/InvestingPage', (req, res) => {
  res.render('InvestingPage',{g_walletBalance});
});
//Render BankLinkPage
app.get('/LinkBankAcc', (req, res) => {
  res.render('LinkBank');
});

// Render investments page
app.get('/InvestmentsPage', (req, res) => {
  res.render('InvestmentsPage', {g_walletBalance});
});

//Render Option page
app.get('/Options', (req, res) => {
  res.render('OptionsPage');
});

// Validation:
// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      res.redirect('/HomePage');
    } else {
      res.render('LoginPage', { message: 'Wrong Username or Password' });
    }
  });

// Handle signup
app.post('/signup/v1/', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({username: username, email: email, password:password});
  
  newUser.save()
    .then(result => {
      res.render('SignupPage',{message:'User added successfully', error:''});
    })
    .catch(error => {
      console.log(`Could not add user: ${error}`);
      res.render('SignupPage',{message:'', error:'Could not add user, please try again later'});
    });
});

// Card validation  (It's working), [NEEDS WORK STILL]
// [MAKE NAMINGS CONSISTENT, for app.js and Deposit.ejs]
// the expDate):
/*const userExists = users.some(user => user.username === username || user.email === email);

  if (userExists) {
    res.render('SignupPage', { message: 'Username or Email is already in use.' });
  } else {
    res.redirect('/LoginPage');
  }*/ 
app.post('/DepositPage', (req, res) => {
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
    res.redirect('/DepositSuccessPage'); // Redirect to the success page (adjust the route as needed)
  } else {
    res.render('DepositPage', { message: 'Invalid card details' }); // Invalid card details, render the DepositPage with an error message
  }
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
app.post('/WithdrawPage', (req, res) => {
  const currentDate = new Date();
  const expirationInput = req.body.expirationDate; // Using the 'name' attribute to access the input
  const [month, year] = expirationInput.split('/'); // Parse the month and year from the expiration input
  const expirationDate = new Date(year, month, 0, 23, 59, 59, 999); // Adjust to create a Date object for the last moment of the expiration month

  if (currentDate > expirationDate) { // Compare current date to expiration date
    res.render('withdrawPage', { message: 'Card is expired' }); // If the card is expired, render the WithdrawPage with an error message
  } else {
    res.redirect('/HomePage'); // If the card is not expired, redirect to the HomePage
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('ErrorPage');
});

// Start the server
app.listen(process.env.Port, () => {
  console.log(`Server is running on port ${process.env.Port}`);
});