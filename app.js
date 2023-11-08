//Day 2

//paili internal server banayau
const express = require("express");
const app = express();

//aba view engine pani setup gareko
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(3000, () => {
  console.log("Server started at port 3000.");
});

//tyasapchhi node save garne bittikai server reload garna hamile nodemon install garyau
