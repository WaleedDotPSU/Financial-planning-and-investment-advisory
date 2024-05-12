// Import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai'); // Import OpenAI library
const { sendEmail } = require('./public/js/emailService');
const User = require('./models/User');
const Card = require('./models/Card');

// Initialize Express app
const app = express();

// Initialize Global variable
const g_walletBalance = 1000;

// Set up OpenAI with API key from environment variable
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Define route objects
const routes = [
  { path: '/', redirect: '/login-page' },
  { path: '/login-page', template: 'login-page', message: '' },
  { path: '/ai-page', template: 'ai-page', message: '' },
  { path: '/ai2-page', template: 'ai2-page', message: '' },
  { path: '/signup-page', template: 'signup-page', message: '', error: '' },
  { path: '/forget-pass-page', template: 'forget-pass-page', message: '', error: '' },
  { path: '/home-page', template: 'home-page', g_walletBalance },
  { path: '/planning-advice-page', template: 'planning-advice-page', g_walletBalance },
  { path: '/deposit-page', template: 'deposit-page', message: '', g_walletBalance },
  { path: '/withdraw-page', template: 'withdraw-page', g_walletBalance },
  { path: '/invest-options-page', template: 'invest-options-page', g_walletBalance },
  { path: '/InvestingPage', template: 'InvestingPage', g_walletBalance },
  { path: '/bank-link-page', template: 'bank-link-page' },
  { path: '/finance-plan-page', template: 'finance-plan-page', g_walletBalance },
  { path: '/my-invests-page', template: 'my-invests-page', g_walletBalance },
  { path: '/options-page', template: 'options-page' },
];

// Dynamically define routes
routes.forEach(route => {
  if (route.redirect) {
    app.get(route.path, (req, res) => {
      res.redirect(route.redirect);
    });
  } else {
    app.get(route.path, (req, res) => {
      res.render(route.template, { message: route.message, error: route.error, g_walletBalance: route.g_walletBalance });
    });
  }
});

// Route to handle login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && password === user.password) {
      return res.redirect('/home-page');
    } else {
      return res.render('login-page', { message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle signup
app.post('/signup/v1/', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username: username, email: email, password: password });

  newUser.save()
    .then((result) => {
      res.render('signup-page', { message: 'User added successfully', error: '' });
    })
    .catch((error) => {
      console.log(`Could not add user: ${error}`);
      res.render('signup-page', { message: '', error: 'Could not add user, please try again later' });
    });
});

// Route to handle forget password
app.post('/forget-pass/v1', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).render('forget-pass-page', { message: 'Invalid email address', error: '' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).render('forget-pass-page', { message: '', error: 'User not found' });
    }

    const emailText = `Hey ${user.username},\n\nYour password is: ${user.password}\n\nPlease consider changing it once you're logged in.`;

    await sendEmail(user.email, 'Your Password Recovery', emailText);

    res.render('forget-pass-page', { message: 'Password is sent to your email', error: '' });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error in forget password:', error);
    res.status(500).render('forget-pass-page', { message: '', error: 'Internal server error' });
  }
});

// Handle deposit
app.post('/deposit-page', (req, res) => {
  const { cardNumber, cardHolder, expDate, cvv } = req.body;

  // Implement deposit functionality here

  res.redirect('/home-page');
});

// Handle withdraw
app.post('/withdraw-page', (req, res) => {
  // Implement withdraw functionality here

  res.redirect('/home-page');
});



// Route to handle AI chat
app.post('/ask-ai', async (req, res) => {
  const { ask } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: ask }],
      model: "gpt-3.5-turbo",
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error during AI chat:', error);
    res.status(500).json({ message: 'Sorry, something went wrong.' });
  }
});



// Route to handle 404 errors
app.use((req, res) => {
  res.status(404).render('error-page');
});

// Start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Successfully connected to database server..`);
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Web server listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
