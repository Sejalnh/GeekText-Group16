const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlistModel");
const User = require("../models/userModel");

// ------------------------- Feature 6 ---------------------------- //

class WishlistManagementController {
  // 6.1 Must be able to create a wishlist of books that belongs to user and has a unique name
  static postWishlist = async (req, res) => {
    const { name, username, items } = req.body;

    const wish = new Wishlist({
      name,
      username,
      items
    });

    try {
      await wish.save();
      res.status(200).send("Wishlist created!");
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  // 6.2 Must be able to add a book to a user’s wishlist
  static postBook = async (req, res) => {
    const wishlistId = req.params.wishlistId;
    const bookId = req.params.bookId;

    try {
      // Find the wishlist and update it with the new book if it doesn't already exist:
      const wishlist = await Wishlist.findOneAndUpdate(
        { _id: wishlistId },
        { $addToSet: { items: { bookId } } },
        { new: true, upsert: true }
      );

      res.status(200).json({ message: "Book added to wishlist" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  // 6.3 Must be able to remove a book from a user’s wishlist into the user’s shopping cart
  static deleteToCart = async (req, res) => {
    const wishlistId = req.params.wishlistId;
    const bookId = req.params.bookId;

    try {
      const wishlist = await Wishlist.findById(wishlistId);
      const username = wishlist.username;

      // Find the user and add the book to their shopping cart:
      await User.findOneAndUpdate(
        { username },
        { $push: { shopppingCart: bookId } }
      );

      // Delete the book from the user's wishlist:
      await Wishlist.findOneAndUpdate(
        { _id: wishlist },
        { $pull: { items: { bookId } } }
      );

      res.status(200).json({ message: "Book added to shopping cart!" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  // 6.4 Must be able to list the book’s in a user’s wishlist
  static getWishlist = async (req, res) => {
    const name = req.params.name;

    try {
      const wishlist = await Wishlist.find({ name });
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  // 6.5 Delete a book from a wishlist
  static deleteBook = async (req, res) => {
    const wishlistId = req.params.wishlistId;
    const bookId = req.params.bookId;

    try {
      const wishlist = await Wishlist.findById(wishlistId);

      // Delete the book from the user's wishlist:
      await Wishlist.findOneAndUpdate(
        { _id: wishlist },
        { $pull: { items: { bookId } } }
      );

      res.status(200).json({ message: "Book deleted from wishlist!" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
}

// ------------------------- Routers ---------------------------- //

// Main feature:
router.post("/wishlists/create", WishlistManagementController.postWishlist);
router.post(
  "/wishlists/add-book/:wishlistId/:bookId",
  WishlistManagementController.postBook
);
router.delete(
  "/wishlists/add-to-cart/:wishlistId/:bookId",
  WishlistManagementController.deleteToCart
);
router.get("/wishlists/view/:name", WishlistManagementController.getWishlist);

// Additional Feature:
router.delete(
  "/wishlists/delete-book/:wishlistId/:bookId",
  WishlistManagementController.deleteBook
);

module.exports = router;
