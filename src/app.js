const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("../Routes/routes");
const mongoose = require("mongoose");

const app = express();

// Establish MongoDB connection
mongoose.connect("mongodb://localhost:27017/E_seva", {
  serverSelectionTimeoutMS: 3000,
});

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("DataBase connected successfully");
});

// Express app configurations
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "E_seva",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});