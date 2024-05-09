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

//For Transactions
const Transaction = require('./models/Transaction');
const { linkBankAccount } = require('./public/js/utils');


// Set up OpenAI with API key from environment variable
const openai = new OpenAI(process.env.OPENAI_API_KEY); 

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

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
  res.render('login-page', { message: '' });
});

// Render ai page
app.get('/ai-page', (req, res) => {
  res.render('ai-page', { message: '' });
});

// Render signup page
app.get('/signup-page', (req, res) => {
  res.render('signup-page', { message: '', error: '' });
});

// Render forget password page
app.get('/forget-pass-page', (req, res) => {
  res.render('forget-pass-page', { message: '', error: '' });
});

// Render home page
app.get('/home-page', (req, res) => {
  res.render('home-page', { g_walletBalance });
});

// Render planning and advisory page
app.get('/planning-advice-page', (req, res) => {
  res.render('planning-advice-page', { g_walletBalance });
});

// Render deposit page
app.get('/deposit-page', (req, res) => {
  res.render('deposit-page', { message: '', g_walletBalance });
});

// Render withdraw page
app.get('/withdraw-page', (req, res) => {
  res.render('withdraw-page', { g_walletBalance });
});

// Render investment options page
app.get('/invest-options-page', (req, res) => {
  res.render('invest-options-page', { g_walletBalance });
});

// Render investing page
app.get('/InvestingPage', (req, res) => {
  res.render('InvestingPage', { g_walletBalance });
});

// Render bank linking page
app.get('/bank-link-page', (req, res) => {
  res.render('bank-link-page');
});

// Render financial planning page
app.get('/finance-plan-page', (req, res) => {
  res.render('finance-plan-page', { g_walletBalance });
});

// Render my investments page
app.get('/my-invests-page', (req, res) => {
  res.render('my-invests-page', { g_walletBalance });
});

// Render options page
app.get('/options-page', (req, res) => {
  res.render('options-page');
});

// Handle login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      if (password === user.password) {
        return res.redirect('/home-page');
      }
    }

    res.render('login-page', { message: 'Invalid username or password' });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle signup
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

// Handle forget password
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

    const emailText = `Hey ${user.username},\n\nYour password is: ${user.password}\n\nPlease consider changing it once your logged in.`;

    await sendEmail(user.email, 'Your Password Recovery', emailText);

    res.render('forget-pass-page', { message: 'Password is sent to your email', error: '' });

    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error in forget password:', error);
    res.status(500).render('forget-pass-page', { message: '', error: 'Internal server error' });
  }
});

// Handle deposit
app.post('/deposit-page', (req, res) => {
  const { cardNumber, cardHolder, expDate, cvv } = req.body;

  const card = cards.find((c) =>
    c.cardNumber === cardNumber && c.cardHolder === cardHolder &&
    c.expDate === expDate && c.cvv === cvv);

  if (card) {
    res.redirect('/home-page');
  } else {
    res.render('deposit-page', { message: 'Invalid card details', g_walletBalance });
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

// Start the server
mongoose.connect(process.env.MONGO_URI)
  .then((result) => {
    console.log(`Successfully connected to database server..`);
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Web server listening on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
