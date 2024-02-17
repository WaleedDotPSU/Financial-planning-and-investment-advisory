// Import dependencies
const express = require('express');
require('dotenv').config();

// Initialize Express app
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Dummy user data for testing
const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
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
  res.redirect('/LoginPage');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('ErrorPage');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.Port}`);
});
