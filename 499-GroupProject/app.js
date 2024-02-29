// Import dependencies
const express = require('express');
require('dotenv').config();

// Initialize Express app
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Dummy user data for testing
const users = [
  { username: 'user1', password: 'pass1', email: 'user1@hotmail.com' },
  { username: 'user2', password: 'pass2', email: 'user2@hotmail.com' },
];


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Redirect to login page
app.get('/', (req, res) => {
  res.redirect('/LoginPage');
});

// Render home page
app.get('/HomePage', (req, res) => {
  res.render('HomePage');
});

// Render login page
app.get('/LoginPage', (req, res) => {
  res.render('LoginPage', { message: '' });
});

// Render signup page
app.get('/SignupPage', (req, res) => {
  res.render('SignupPage');
});

// Render deposit page
app.get('/DepositPage', (req, res) => {
  res.render('DepositPage', { message: '' });
});

// Render RiskPage
app.get('/RiskPage', (req, res) => {
  res.render('RiskPage');
});

// Render WithdrawPage
app.get('/WithdrawPage', (req, res) => {
  res.render('withdrawPage', { message: '' });
});

// Test route
app.get('/test', (req, res) => {
  res.render('test');
});

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

// Handle deposit
// NEEDS FIXING, the date not to be older than the current date, e.g. Feb, 24. I don't think it's working yet
//Check for the amount not to be negative
app.post('/DepositPage', (req, res) => {
  const currentDate = new Date();
  const expirationInput = req.body.expirationDate; // Using the 'name' attribute to access the input

  // Parse the month and year from the expiration input
  const [month, year] = expirationInput.split('/');
  // Adjust to create a Date object for the last moment of the expiration month
  const expirationDate = new Date(year, month, 0, 23, 59, 59, 999);

  // Compare current date to expiration date
  if (currentDate > expirationDate) {
    // If the card is expired, render the DepositPage with an error message
    res.render('DepositPage', { message: 'Card is expired' });
  } else {
    // If the card is not expired, redirect to the HomePage
    res.redirect('/HomePage');
  }
});



// Handle withdrawPage. 
//Only make it to check the wallet balance + add the IBAN for instance to withdraw
app.post('/WithdrawPage', (req, res) => {
  const currentDate = new Date();
  const expirationInput = req.body.expirationDate; // Using the 'name' attribute to access the input

  // Parse the month and year from the expiration input
  const [month, year] = expirationInput.split('/');
  // Adjust to create a Date object for the last moment of the expiration month
  const expirationDate = new Date(year, month, 0, 23, 59, 59, 999);

  // Compare current date to expiration date
  if (currentDate > expirationDate) {
    // If the card is expired, render the WithdrawPage with an error message
    res.render('withdrawPage', { message: 'Card is expired' });
  } else {
    // If the card is not expired, redirect to the HomePage
    res.redirect('/HomePage');
  }
});




// Handle signup
app.post('/SignupPage', (req, res) => {
  const { username, email } = req.body;
  const userExists = users.some(user => user.username === username || user.email === email);

  if (userExists) {
    // Username or email already in use
    res.render('SignupPage', { message: 'Username or Email is already in use.' });
  } else {
    // For demonstration, this will just redirect to the login page
    res.redirect('/LoginPage');
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
