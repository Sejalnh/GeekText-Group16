const express = require("express");
const dotenv = require("dotenv").config(); // TODO: ADD .env for PRODUCTION
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const User = require("./models/userModel");
const Author = require("./models/authorModel");
const cors = require("cors");

// CONTROLLERS
const BookBrowsingController = require("./controllers/BookBrowsingController");
const BookDetailsController = require("./controllers/BookDetailsController");
const DatabaseTestController = require("./controllers/DatabaseTestController");

// TODO: move into .env for PRODUCTION
const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://admin1:1234@cluster0.qngmqvw.mongodb.net/GeekTextDB?retryWrites=true&w=majority";

// START THE APP
const app = express();

// MIDDLE-WARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ensure we can parse the URL parameters correctly
app.use(cors());

// CONNECT TO DATABASE
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () =>
  console.log(`MongoDB connected...`)
);

// CONTROLLERS/ROUTERS
app.use("/browser", BookBrowsingController); // Feature 1
app.use("/details", BookDetailsController); // Feature 4

// DATABASE TEST CONTROLLER
app.use("/database", DatabaseTestController);

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
