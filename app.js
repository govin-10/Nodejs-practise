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

//multer import
const { multer, storage } = require("./middleware/multerConfig.js");
const upload = multer({ storage: storage });

//accessing the uploaded files
app.use(express.static("data"));

app.get("/", async (req, res) => {
  const allBlogs = await blogs.findAll();

  res.render("allBlogs.ejs", { allBlogs: allBlogs });
});

app.get("/addblogs", (req, res) => {
  res.render("addBlogs.ejs");
});

app.post("/addblogs", upload.single("photo"), async (req, res) => {
  const { fullName, subTitle, description } = req.body;
  const { filename } = req.file;
  await blogs.create({
    title: fullName,
    subTitle,
    imageUrl: filename,
    description,
  });
  res.send("<script>alert('Blogs created successfully.')</script>");
});

app.get("/edit/:id", async (req, res) => {
  const blog = await blogs.findAll({
    where: {
      id: req.params.id,
    },
  });

  res.render("editBlog.ejs", {
    blog: blog[0],
    BASE_URL: process.env.base_url,
    PORT: process.env.PORT,
  });
});

app.post("/editblog/:id", upload.single("newImage"), async (req, res) => {
  const { title, subTitle, description } = req.body;

  // Check if a new image was uploaded
  const blog = await blogs.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (req.file.filename) {
    require("fs").unlink(`./data/${blog[0].imageUrl}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file updated success.");
      }
    });
  }

  await blog[0].update({
    title,
    subTitle,
    imageUrl: req.file ? req.file.filename : blog[0].imageUrl,
    description,
  });

  res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT}`);
});
