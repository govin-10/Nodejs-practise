//Day 3
//Aaja dekhi Blogs ko CRUD feature applicable hune project garna suru gareko

//paili server banaune

const express = require("express");
const { blogs } = require("./model/index.js");
const app = express();

//env initiation
require("dotenv").config();

//db usage
require("./model/index.js");

//get form values
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

//ejs template usage
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("allBlogs.ejs");
});

app.get("/addblogs", (req, res) => {
  res.render("addBlogs.ejs");
});

app.post("/addblogs", (req, res) => {
  blogs.create({
    title: req.body.fullName,
    subTitle: req.body.subTitle,
    imageUrl: req.body.photo,
    description: req.body.description,
  });
  res.send("<script>alert('Blogs created successfully.')</script>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT}`);
});
