const express = require("express");
const router = express.Router();
const Books = require("../models/booksModel");

class BookBrowsingController {
  static getByGenre = async (req, res) => {
    const genre = req.params.genre; // retrieve the genre from the URL

    try {
      const books = await Books.find({ genre }); // wait for books to be retrieved ASYNCHRONOUSLY
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  static getTopTen = async (req, res) => {
    try {
      const books = await Books.find().sort({ copiesSold: -1 }).limit(10);
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  static getByRating = async (req, res) => {
    const rating_param = parseFloat(req.params.rating);

    try {
      const books = await Books.find({ rating: { $gte: rating_param } });
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  static applyDiscount = async (req, res) => {
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
  };
}

// routes
router.get("/books/genre/:genre", BookBrowsingController.getByGenre);
router.get("/books/top10", BookBrowsingController.getTopTen);
router.get("/books/rating/:rating", BookBrowsingController.getByRating);
router.put("/books/discount", BookBrowsingController.applyDiscount);

module.exports = router;
