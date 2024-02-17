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
  res.render('DepositPage');
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
app.post('/DepositPage', (req, res) => {
  res.redirect('/HomePage');
});

// Handle signup
app.post('/SignupPage', (req, res) => {
  const { username, email } = req.body;
  const userExists = users.some(user => user.username === username || user.email === email);

  if (userExists) {
    // Username or email already in use
    res.render('SignupPage', { message: 'Username or Email already in use.' });
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
