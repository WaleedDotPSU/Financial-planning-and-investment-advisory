/* Imports */
require("dotenv").config();
const { Console } = require("console");
const express = require("express");
const bodyParser = require('body-parser');
const App = express();



App.set(("view engine"),("ejs"));
App.use(express.static("public"));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

/* Get */
App.get("/", (req, res) => { res.redirect("/loginPage"); });
App.get("/Page2", (req, res) => { res.render("Page2"); });
App.get("/Page1", (req, res) => { res.render("Page1"); });
App.get("/loginPage", (req, res) => { res.render("LoginPage"); });
App.get("/SingupPage", (req, res) => { res.render("SingupPage"); });

const users = [
    { username: "user1", password: "pass1" }, // Trial
  ];

/* Post */
App.post('/LoginPage', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.send({ status: 'success', message: 'Logged in successfully' });
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid credentials' });
    }
  });

App.use((req,res)=>{res.status(404).render("Error");});

App.listen((process.env.Port),()=>{console.log(`Porting To ${process.env.Port}`);});