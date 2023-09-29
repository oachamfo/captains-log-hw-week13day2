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

//models
const Log = require("./models/logs.js");

//routes
//homepage route
app.get("/", (req, res) => {
  res.send("Welcome to Captain's Log App");
});

//logs index
app.get("/logs", async (req, res) => {
  try {
    const logs = await Log.find();
    res.render("Index", { logs: logs });
  } catch (error) {
    console.error(error);
  }
});

//logs new
app.get("/logs/new", (req, res) => {
  res.render("New");
});

//logs create
app.post("/logs", async (req, res) => {
  try {
    if (req.body.shipIsBroken === "on") {
      //if ready to eat is checked by user
      req.body.shipIsBroken = true; //do some data correction
    } else {
      //if ready to eat is not checked by user
      req.body.shipIsBroken = false; //do some data correction
    }

    //store new log in cloud db
    await Log.create(req.body);

    res.render("Show", { log: req.body }); //redirect to show route
  } catch (error) {
    console.log(error);
  }
});

//logs show
app.get("/logs/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    res.render("Show", { log: log });
  } catch (error) {
    console.log(error);
  }
});

//listen on port 3000
app.listen(3000, () => {
  console.log("listening");
});
