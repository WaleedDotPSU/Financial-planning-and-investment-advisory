/* Imports */
const { Console } = require("console");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const loginRoutes = require('./scripts/loginFunction'); 

require("dotenv").config();


app.set(("view engine"),("ejs"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Use */
app.use('/auth', loginRoutes);

/* Get */
App.get("/", (req, res) => { res.redirect("/loginPage"); });
App.get("/homePage", (req, res) => { res.render("home"); });
App.get("/loginPage", (req, res) => { res.render("LoginPage"); });
App.get("/SingupPage", (req, res) => { res.render("SingupPage"); });
App.get("/depositPage", (req, res) => { res.render("DepositPage"); });

/* Toggle Function For PassWord */
function Toggle() {
  let temp = document.getElementById("_Password_SignUp");
   
  if (temp.type === "password") {
      temp.type = "text";
  } else {
      temp.type = "password";
  }
}

/* ERROR */
app.use((req,res)=>{res.status(404).render("Error");});

/* PORT CONNECTION */
app.listen((process.env.Port),()=>{console.log(`Porting To ${process.env.Port}`);});