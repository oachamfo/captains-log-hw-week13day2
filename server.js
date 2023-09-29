//initialize app
const express = require("express");
const app = express();

const jsxEngine = require("jsx-view-engine"); //require view engine
const mongoose = require("mongoose"); //require mongoose db; allows for object document mapping
const methodOverride = require("method-override"); //method-override package: for spoofing HTTP methods
require("dotenv").config(); //require .env file; allows for process.env.some_const_inside_env_goes_here syntax to be used

//add views templating engine
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//middleware
//body parser middleware included in express; allows for req.body syntax to be used
app.use(express.urlencoded({ extended: true }));

//use methodOverride package for adding a query parameter to the delete form named _method
//allows for delte method to be spoofed
app.use(methodOverride("_method"));

//db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//routes
//homepage route
app.get("/", (req, res) => {
  res.send("Welcome to Captain's Log App");
});

//logs index
app.get("/logs/", async (req, res) => {
  try {
    res.send("Index");
  } catch (error) {
    console.error(error);
  }
});

//logs new
app.get("/logs/new", (req, res) => {
  res.render("New");
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening");
});