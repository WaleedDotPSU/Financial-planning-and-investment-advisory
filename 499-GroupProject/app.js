/* Imports */
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

/* Use */
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Get */
app.get("/", (req, res) => { res.redirect("/LoginPage"); });
app.get("/HomePage", (req, res) => { res.render("HomePage"); });
app.get("/LoginPage", (req, res) => { res.render("LoginPage"); });
app.get("/SignupPage", (req, res) => { res.render("SignupPage"); });
app.get("/depositPage", (req, res) => { res.render("DepositPage"); });
app.get("/test", (req, res) => { res.render("test"); });

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Find user in the dummy data
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.redirect('/HomePage')
  } else {
    // Respond with an error status code and message if login fails
    res.status(404).json({message:"Wrong Username or Password"})
  }
});


app.post('/test',(req,res)=>{

  res.redirect("/HomePage");
});

/* Toggle Function For PassWord */
function Toggle() {
  let temp = document.getElementById("_Password_SignUp");
   
  if (temp.type === "password") {
      temp.type = "text";
  } else {
      temp.type = "password";
  }
}

/* Error */
app.use((req,res)=>{res.status(404).render("ErrorPage");});

/* Port connection */
app.listen((process.env.Port),()=>{console.log(`Porting To ${process.env.Port}`);});