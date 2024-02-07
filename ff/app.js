require("dotenv").config();
const { Console } = require("console");
const express = require("express");
const App = express();

App.set(("view engine"),("ejs"));
App.use(express.static("public"));

App.get("/", (req, res) => { res.redirect("/loginPage"); });
App.get("/Page2", (req, res) => { res.render("Page2"); });
App.get("/Page1", (req, res) => { res.render("Page1"); });
App.get("/loginPage", (req, res) => { res.render("LoginPage"); });
App.get("/SingupPage", (req, res) => { res.render("SingupPage"); });


App.post("/loginPage",(req,res)=>{

res.redirect("/ChoicesPage");
});




App.use((req,res)=>{res.status(404).render("Error");});

App.listen((process.env.pp),()=>{console.log(`Porting To ${process.env.pp}`);});