// Import
const { Console } = require("console");
const express = require("express");

const app = express();
require("dotenv").config();
app.set(("view engine"),("ejs"));

// Dummy user data for testing
const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" }
];

// Use 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get
app.get("/", (req, res) => { res.redirect("/LoginPage"); });
app.get("/HomePage", (req, res) => { res.render("HomePage"); });
app.get("/LoginPage", (req, res) => { res.render("LoginPage",{message:""}); });
app.get("/SignupPage", (req, res) => { res.render("SignupPage"); });
app.get("/DepositPage", (req, res) => { res.render("DepositPage"); });
app.get("/test", (req, res) => { res.render("test"); });

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.redirect('/HomePage')
  } else {
    res.render('LoginPage',{message:"Wrong Username or Password"})
  }
});

// Deposit route
app.post('/DepositPage',(req,res)=>{
  res.redirect("/HomePage");
});

// Error 
app.use((req,res)=>{res.status(404).render("ErrorPage");});

// Port connection 
app.listen((process.env.Port),()=>{console.log(`Porting To ${process.env.Port}`);});