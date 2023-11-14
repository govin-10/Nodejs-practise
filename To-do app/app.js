const express = require("express");
const app = express();

//import env
require("dotenv").config();

//use the ejs template
app.set("view engine", "ejs");

//db
const { toDo } = require("./model/index.js");
require("./model/index.js");

//handle json and form datas
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

app.get("/", async (req, res) => {
  const activities = await toDo.findAll();
  //console.log(activites);
  res.render("index.ejs", { activities });
});

//add new item into the database
app.post("/additem", async (req, res) => {
  const { activity } = req.body;

  await toDo.create({
    activity,
  });

  res.redirect("/");
});

app.get("/completed/:id", async (req, res) => {
  const currentActivity = await toDo.findAll({
    where: {
      id: req.params.id,
    },
  });
  await currentActivity[0].destroy();
  res.redirect("/");
});

//delete item
app.get("/delete/:id", async (req, res) => {
  const currentActivity = await toDo.findAll({
    where: {
      id: req.params.id,
    },
  });
  await currentActivity[0].destroy();
  res.redirect("/");
});

//initialize the server
app.listen(process.env.PORT, () => {
  console.log(`Server initiated.`);
});
