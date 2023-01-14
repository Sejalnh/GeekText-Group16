const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const cors = require("cors");

const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://admin1:1234@cluster0.qngmqvw.mongodb.net/GeekTextDB?retryWrites=true&w=majority";

// START THE APP
const app = express();

// MIDDLE-WARE
app.use(express.json());
// app.use(cors());

// CONNECT TO DATABASE
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () =>
  console.log(`MongoDB connected...`)
);

// ROUTES
app.get("/books", async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
