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
  console.log(allBlogs);
  res.render("allBlogs.ejs", { allBlogs: allBlogs });
});

app.get("/addblogs", (req, res) => {
  res.render("addBlogs.ejs");
});

app.post("/addblogs", upload.single("photo"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const { fullName, subTitle, photo, description } = req.body;
  const { filename } = req.file;
  await blogs.create({
    title: fullName,
    subTitle,
    imageUrl: filename,
    description,
  });
  res.send("<script>alert('Blogs created successfully.')</script>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT}`);
});
