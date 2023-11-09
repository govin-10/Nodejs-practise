//Day 3
//Aaja dekhi Blogs ko CRUD feature applicable hune project garna suru gareko

//paili server banaune

const express = require("express");
const app = express();

//env initiation
require("dotenv").config();

//require("./model/index.js");

//ejs template usage
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("allBlogs.ejs");
});

app.get("/addblogs", (req, res) => {
  res.render("addBlogs.ejs");
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT}`);
});
