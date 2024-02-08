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




// Handle form submission for signup
App.post("/SingupPage", (req, res) => {
  // Handle form submission, e.g., save user data to database
  // Redirect to login page with success message
  res.render("LoginPage", { message:"Test"});
});



// Toggel ShowPassword OFF or On 
App.get("/app.js", (req, res) => {
    res.sendFile(path.join(__dirname, "app.js"));
  });







App.use((req,res)=>{res.status(404).render("Error");});

App.listen((process.env.Port),()=>{console.log(`Porting To ${process.env.Port}`);});