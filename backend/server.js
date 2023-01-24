const express = require("express");
const dotenv = require("dotenv").config(); // TODO: ADD .env for PRODUCTION
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const cors = require("cors");

// TODO: move into .env for PRODUCTION
const PORT = 4000;
const MONGO_URI =
  "mongodb+srv://admin1:1234@cluster0.qngmqvw.mongodb.net/GeekTextDB?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// START THE APP
const app = express();

// MIDDLE-WARE
app.use(express.urlencoded()); // ensure we can parse the URL parameters correctly
app.use(cors());
app.use(express.json());

// CONNECT TO DATABASE
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () =>
  console.log(`MongoDB connected...`)
);

// ROUTES
// ------------------------------ Feature 4 ---------------------------------------

// 4.1 An administrator must be able to create a book with the book ISBN, book
//    name, book description, price, author, genre, publisher , year published and
//    copies sold. POST
app.post("/books/create", async (request, response) => {
  const { title, ISBN, author, genre, copiesSold, rating, publisher, price } =
    request.body;

  const books = new Books({
    title,
    ISBN,
    author,
    genre,
    copiesSold,
    rating,
    publisher,
    price,
  });

  try {
    books = await books.save();
    //response.status(200).json(books);
    response.status(200).send(books);
  } catch (error) {
    response.status(404).send(error.message);
  }
});

// 4.2 Must be able retrieve a book’s details by the ISBN GET
app.get("/books/ISBN/:ISBN", async (request, response) => {
  const ISBN = request.params.ISBN; // retrieve the genre from the URL

  try {
    const books = await Books.find({ ISBN }); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
  }
});
// 4.3 An administrator must be able to create an author with first name, last
//     name, biography and publisher POST

// 4.4 Must be able to retrieve a list of books associated with an author GET
app.get("/books/author/:author", async (request, response) => {
  const author = request.params.author; // retrieve the genre from the URL

  try {
    const books = await Books.find({ author }); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
  }
});

// ROUTES
// ------------------------------ Feature 1 ---------------------------------------
// 1.1 Retrieve List of Books by Genre
app.get("/books/genre/:genre", async (request, response) => {
  const genre = request.params.genre; // retrieve the genre from the URL

  try {
    const books = await Books.find({ genre }); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
  }
});

// 1.2 Retrieve List of Top Sellers (Top 10 books that have sold the most copied)
app.get("/books/top10", async (req, res) => {
  try {
    const books = await Books.find().sort({ copiesSold: -1 }).limit(10);
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// 1.3 Retrieve List of Books for a particular rating and higher
app.get("/books/rating/:rating", async (req, res) => {
  const rating_param = parseFloat(req.params.rating);

  try {
    const books = await Books.find({ rating: { $gte: rating_param } });
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// 1.4 Discount books by publisher
app.put("/books/discount", async (req, res) => {
  const percentDiscount = 1.0 - parseFloat(req.body.percentDiscount) / 100.0;
  const publisher_param = req.body.publisher;

  try {
    const books = await Books.updateMany(
      { publisher: publisher_param },
      { $mul: { price: percentDiscount } }
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ----------------------------------------------------------------------------------

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
