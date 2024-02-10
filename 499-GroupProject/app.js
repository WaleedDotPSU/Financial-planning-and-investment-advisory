/* Imports */
const bodyParser = require('body-parser');
const { Console } = require("console");
const express = require("express");

const app = express();
require("dotenv").config();
app.set(("view engine"),("ejs"));

/* Use */
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Get */
app.get("/", (req, res) => { res.redirect("/LoginPage"); });
app.get("/HomePage", (req, res) => { res.render("HomePage"); });
app.get("/LoginPage", (req, res) => { res.render("LoginPage"); });
app.get("/SingupPage", (req, res) => { res.render("SingupPage"); });
app.get("/depositPage", (req, res) => { res.render("DepositPage"); });
app.get("/test", (req, res) => { res.render("test"); });

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